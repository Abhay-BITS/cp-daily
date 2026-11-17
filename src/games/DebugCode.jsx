import { useState, useCallback, useRef, useEffect } from 'react'
import { debugSnippets } from '../data/gameData'
import { Heart, Check, X, MousePointerClick } from 'lucide-react'
import { MAX_POINTS } from '../data/games'

const KEYWORDS = new Set([
  'int', 'for', 'if', 'return', 'using', 'namespace', 'void', 'while',
  'vector', 'cout', 'cin', 'endl', 'include', 'max', 'main', 'long',
  'auto', 'else', 'struct', 'class', 'bool', 'true', 'false', 'break',
  'continue', 'do', 'switch', 'case', 'const', 'static', 'string',
  'bits', 'stdc', 'h', 'std',
])

const TYPES = new Set(['int', 'long', 'void', 'bool', 'vector', 'string', 'auto'])

function highlightCode(text) {
  const parts = []
  let i = 0

  while (i < text.length) {
    if (text.startsWith('//', i)) {
      parts.push(<span key={i} className="text-t-tertiary italic">{text.slice(i)}</span>)
      break
    }

    if (text[i] === '#') {
      const end = text.indexOf('>', i)
      if (end !== -1) {
        parts.push(<span key={i} className="text-t-tertiary">{text.slice(i, end + 1)}</span>)
        i = end + 1
        continue
      }
      parts.push(<span key={i} className="text-t-tertiary">{text.slice(i)}</span>)
      break
    }

    if (text[i] === '"' || text[i] === "'") {
      const quote = text[i]
      let j = i + 1
      while (j < text.length && text[j] !== quote) {
        if (text[j] === '\\') j++
        j++
      }
      parts.push(<span key={i} className="text-semantic-green">{text.slice(i, j + 1)}</span>)
      i = j + 1
      continue
    }

    if (/[0-9]/.test(text[i]) && (i === 0 || !/[a-zA-Z_]/.test(text[i - 1]))) {
      let j = i
      while (j < text.length && /[0-9.]/.test(text[j])) j++
      parts.push(<span key={i} className="text-semantic-yellow">{text.slice(i, j)}</span>)
      i = j
      continue
    }

    if (/[a-zA-Z_]/.test(text[i])) {
      let j = i
      while (j < text.length && /[a-zA-Z0-9_]/.test(text[j])) j++
      const word = text.slice(i, j)
      if (TYPES.has(word)) {
        parts.push(<span key={i} className="text-semantic-blue font-semibold">{word}</span>)
      } else if (KEYWORDS.has(word)) {
        parts.push(<span key={i} className="text-semantic-blue">{word}</span>)
      } else {
        parts.push(<span key={i} className="text-t-primary">{word}</span>)
      }
      i = j
      continue
    }

    if (/[+\-*/%=<>!&|^~?:]/.test(text[i])) {
      let j = i
      while (j < text.length && /[+\-*/%=<>!&|^~?:]/.test(text[j])) j++
      parts.push(<span key={i} className="text-[var(--tle-nav-gold)]">{text.slice(i, j)}</span>)
      i = j
      continue
    }

    parts.push(<span key={i} className="text-t-secondary">{text[i]}</span>)
    i++
  }

  return parts
}

const MAX_ATTEMPTS = 3
const PER_SNIPPET = MAX_POINTS / 3
const snippetPoints = (st) => (st.solved ? Math.max(0, PER_SNIPPET - st.attemptsUsed * 30) : 0)

export default function DebugCode({ onComplete }) {
  const [activeSnippet, setActiveSnippet] = useState(0)
  const [snippetStates, setSnippetStates] = useState(() =>
    debugSnippets.map(() => ({ solved: false, failed: false, attemptsUsed: 0, clickedLines: new Set(), shakingLine: null }))
  )
  const completedRef = useRef(false)

  const snippet = debugSnippets[activeSnippet]
  const state = snippetStates[activeSnippet]
  const remainingAttempts = MAX_ATTEMPTS - state.attemptsUsed
  const resolved = state.solved || state.failed

  useEffect(() => {
    if (completedRef.current || !snippetStates.every((st) => st.solved || st.failed)) return
    completedRef.current = true
    const solved = snippetStates.filter((st) => st.solved).length
    onComplete?.({ points: snippetStates.reduce((sum, st) => sum + snippetPoints(st), 0), summary: `${solved}/${debugSnippets.length} bugs found` })
  }, [snippetStates, onComplete])

  const handleLineClick = useCallback((lineNum, isBuggy) => {
    if (resolved || state.clickedLines.has(lineNum)) return
    const idx = activeSnippet
    setSnippetStates((prev) => prev.map((st, i) => {
      if (i !== idx) return st
      const next = { ...st, clickedLines: new Set(st.clickedLines).add(lineNum) }
      if (isBuggy) next.solved = true
      else {
        next.attemptsUsed += 1
        next.shakingLine = lineNum
        if (next.attemptsUsed >= MAX_ATTEMPTS) next.failed = true
      }
      return next
    }))
    if (!isBuggy) {
      setTimeout(() => setSnippetStates((prev) => prev.map((st, i) => (i === idx ? { ...st, shakingLine: null } : st))), 500)
    }
  }, [activeSnippet, resolved, state.clickedLines])

  const getLineClasses = (lineNum, isBuggy) => {
    const base = 'flex items-stretch transition-colors duration-200'
    if (state.solved && isBuggy) return `${base} bg-semantic-green-bg`
    if (state.failed && isBuggy) return `${base} bg-semantic-yellow-bg`
    if (state.shakingLine === lineNum) return `${base} bg-semantic-red-bg animate-shake`
    if (state.clickedLines.has(lineNum)) return `${base} bg-semantic-red-bg text-t-tertiary`
    if (!resolved) return `${base} hover:bg-brand-blue-soft cursor-pointer`
    return base
  }

  const nextUnresolved = snippetStates.findIndex((st, i) => i !== activeSnippet && !st.solved && !st.failed)

  return (
    <div className="max-w-3xl">
      <div className="flex flex-wrap gap-2 mb-5">
        {debugSnippets.map((s, i) => {
          const st = snippetStates[i]
          const isActive = i === activeSnippet
          return (
            <button
              key={s.id}
              onClick={() => setActiveSnippet(i)}
              className={`h-8 px-3 rounded text-sm font-medium inline-flex items-center gap-1.5 border transition-colors cursor-pointer ${
                isActive ? 'border-brand-blue bg-brand-blue-soft text-brand-blue' : 'border-b-secondary text-t-secondary hover:text-t-primary'
              }`}
            >
              {st.solved && <Check className="w-3.5 h-3.5 text-semantic-green" />}
              {st.failed && <X className="w-3.5 h-3.5 text-semantic-red" />}
              Snippet {i + 1}
            </button>
          )
        })}
      </div>

      <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
        <div>
          <h3 className="text-lg font-semibold text-t-primary">{snippet.title}</h3>
          <p className="font-mono text-sm text-brand-blue mt-0.5">{snippet.constraint}</p>
        </div>
        <div className="flex items-center gap-1" aria-label={`${remainingAttempts} lives left`}>
          {Array.from({ length: MAX_ATTEMPTS }).map((_, i) => (
            <Heart key={i} className={`w-5 h-5 ${i < remainingAttempts ? 'text-semantic-red fill-semantic-red' : 'text-t-tertiary'}`} />
          ))}
        </div>
      </div>

      {!resolved && (
        <p className="mb-3 inline-flex items-center gap-2 text-xs text-t-tertiary">
          <MousePointerClick className="w-4 h-4" />
          Click the line that contains the bug. Every wrong click costs a life.
        </p>
      )}

      <div className="bg-[var(--tle-code-bg)] rounded-tle-lg border border-b-secondary overflow-x-auto py-2">
        {snippet.code.map(({ line, text, buggy }) => (
          <div key={line} className={getLineClasses(line, buggy)} onClick={() => handleLineClick(line, buggy)}>
            <div className="w-12 shrink-0 text-right pr-4 py-1 font-mono text-xs text-t-tertiary select-none flex items-center justify-end">{line}</div>
            <div className="pl-2 pr-4 py-1 font-mono text-sm text-t-primary whitespace-pre flex-1">{highlightCode(text)}</div>
          </div>
        ))}
      </div>

      {resolved && (
        <div className={`mt-4 rounded-tle-lg border p-4 sm:p-5 animate-slide-up ${state.solved ? 'border-semantic-green/40 bg-semantic-green-bg' : 'border-semantic-yellow/40 bg-semantic-yellow-bg'}`}>
          <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
            <span className={`inline-flex items-center gap-1.5 font-semibold ${state.solved ? 'text-semantic-green' : 'text-semantic-yellow'}`}>
              {state.solved ? <Check className="w-4 h-4" /> : <X className="w-4 h-4" />}
              {state.solved ? 'Bug found' : 'Out of lives'}
            </span>
            <span className="font-mono text-sm text-t-secondary">+{snippetPoints(state)} pts</span>
          </div>
          <p className="text-sm text-t-secondary leading-relaxed">{snippet.explanation}</p>
          {nextUnresolved !== -1 && (
            <button onClick={() => setActiveSnippet(nextUnresolved)} className="mt-3 text-sm font-medium text-brand-blue hover:underline cursor-pointer">
              Next snippet
            </button>
          )}
        </div>
      )}
    </div>
  )
}
