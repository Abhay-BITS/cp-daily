import { useState, useEffect, useRef } from 'react'
import { topicPuzzles } from '../data/gameData'
import { Check, X, Lock, Eye, ArrowUpRight } from 'lucide-react'

const POINTS = [100, 70, 40]

export default function GuessTopic({ onComplete }) {
  const [puzzleIdx, setPuzzleIdx] = useState(0)
  const [states, setStates] = useState(() =>
    topicPuzzles.map(() => ({ cluesRevealed: 1, answered: false, correct: false, wrongAnswers: [], shaking: null }))
  )
  const completedRef = useRef(false)

  const puzzle = topicPuzzles[puzzleIdx]
  const state = states[puzzleIdx]
  const points = (st) => (st.correct ? POINTS[st.cluesRevealed - 1] : 0)

  useEffect(() => {
    if (completedRef.current || !states.every((st) => st.answered)) return
    completedRef.current = true
    const correct = states.filter((st) => st.correct).length
    onComplete?.({ points: states.reduce((s, st) => s + points(st), 0), summary: `${correct}/${topicPuzzles.length} topics` })
  }, [states, onComplete])

  const update = (patch) => setStates((prev) => prev.map((s, i) => (i === puzzleIdx ? { ...s, ...patch } : s)))

  const revealClue = () => {
    if (state.cluesRevealed < 3 && !state.answered) update({ cluesRevealed: state.cluesRevealed + 1 })
  }

  const selectAnswer = (option) => {
    if (state.answered || state.wrongAnswers.includes(option)) return
    if (option === puzzle.answer) {
      update({ answered: true, correct: true })
      return
    }
    const wrongAnswers = [...state.wrongAnswers, option]
    if (state.cluesRevealed >= 3) update({ wrongAnswers, answered: true, correct: false })
    else update({ wrongAnswers, cluesRevealed: state.cluesRevealed + 1, shaking: option })
    setTimeout(() => setStates((prev) => prev.map((s) => (s.shaking === option ? { ...s, shaking: null } : s))), 500)
  }

  const nextOpen = states.findIndex((st, i) => i !== puzzleIdx && !st.answered)

  return (
    <div className="max-w-3xl">
      <div className="flex flex-wrap gap-2 mb-5">
        {topicPuzzles.map((p, i) => (
          <button
            key={p.id}
            onClick={() => setPuzzleIdx(i)}
            className={`h-8 px-3 rounded text-sm font-medium inline-flex items-center gap-1.5 border transition-colors cursor-pointer ${
              i === puzzleIdx ? 'border-brand-blue bg-brand-blue-soft text-brand-blue' : 'border-b-secondary text-t-secondary hover:text-t-primary'
            }`}
          >
            {states[i].answered && (states[i].correct ? <Check className="w-3.5 h-3.5 text-semantic-green" /> : <X className="w-3.5 h-3.5 text-semantic-red" />)}
            Puzzle {i + 1}
          </button>
        ))}
      </div>

      <p className="text-sm text-t-secondary mb-4">
        Which data structure or technique fits? A wrong guess reveals the next clue and lowers the points on offer.
      </p>

      <ol className="space-y-2.5 mb-4">
        {puzzle.clues.map((clue, i) => {
          const revealed = i < state.cluesRevealed || state.answered
          return (
            <li
              key={i}
              className={`flex gap-3 rounded-tle border p-4 ${revealed ? 'border-b-secondary bg-[var(--tle-code-bg)]' : 'border-dashed border-b-secondary'}`}
            >
              <span className={`w-6 h-6 shrink-0 rounded text-xs font-mono font-semibold flex items-center justify-center ${revealed ? 'bg-brand-blue-soft text-brand-blue' : 'bg-tle-hover text-t-tertiary'}`}>
                {i + 1}
              </span>
              {revealed ? (
                <p className="text-sm text-t-primary font-mono leading-relaxed">{clue}</p>
              ) : (
                <p className="text-sm text-t-tertiary inline-flex items-center gap-2"><Lock className="w-3.5 h-3.5" />Locked clue</p>
              )}
            </li>
          )
        })}
      </ol>

      {!state.answered && (
        <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
          <span className="text-sm text-t-secondary">
            Correct now: <span className="font-mono font-semibold text-brand-blue">+{POINTS[state.cluesRevealed - 1]} pts</span>
          </span>
          {state.cluesRevealed < 3 && (
            <button
              onClick={revealClue}
              className="inline-flex items-center gap-1.5 h-8 px-3 rounded border border-brand-blue bg-brand-blue-soft text-brand-blue text-sm font-medium hover:bg-brand-blue hover:text-white transition-colors cursor-pointer"
            >
              <Eye className="w-4 h-4" />
              Reveal clue {state.cluesRevealed + 1}
            </button>
          )}
        </div>
      )}

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
        {puzzle.options.map((option) => {
          const isAnswer = option === puzzle.answer
          const isWrong = state.wrongAnswers.includes(option)
          let cls = 'border-b-secondary text-t-primary hover:border-brand-blue hover:text-brand-blue cursor-pointer'
          if (state.answered && isAnswer) cls = 'border-semantic-green bg-semantic-green-bg text-semantic-green animate-pop'
          else if (isWrong) cls = `border-semantic-red/60 bg-semantic-red-bg text-semantic-red line-through ${state.shaking === option ? 'animate-shake' : ''}`
          else if (state.answered) cls = 'border-b-secondary text-t-tertiary'
          return (
            <button
              key={option}
              onClick={() => selectAnswer(option)}
              disabled={state.answered || isWrong}
              className={`h-11 rounded-tle border text-sm font-medium transition-colors disabled:cursor-default ${cls}`}
            >
              {option}
            </button>
          )
        })}
      </div>

      {state.answered && (
        <div className={`mt-5 rounded-tle-lg border p-4 sm:p-5 animate-slide-up ${state.correct ? 'border-semantic-green/40 bg-semantic-green-bg' : 'border-semantic-red/40 bg-semantic-red-bg'}`}>
          <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
            <span className={`inline-flex items-center gap-1.5 font-semibold ${state.correct ? 'text-semantic-green' : 'text-semantic-red'}`}>
              {state.correct ? <Check className="w-4 h-4" /> : <X className="w-4 h-4" />}
              {state.correct ? `Correct with ${state.cluesRevealed} clue${state.cluesRevealed > 1 ? 's' : ''}` : 'Not this time'}
            </span>
            <span className="font-mono text-sm text-t-secondary">+{points(state)} pts</span>
          </div>
          <p className="text-sm text-t-secondary leading-relaxed">
            <span className="font-semibold text-t-primary">{puzzle.answer}.</span> {puzzle.explanation}
          </p>
          <div className="mt-3 flex flex-wrap gap-4">
            {nextOpen !== -1 && (
              <button onClick={() => setPuzzleIdx(nextOpen)} className="text-sm font-medium text-brand-blue hover:underline cursor-pointer">Next puzzle</button>
            )}
            <a href="#" className="inline-flex items-center gap-1 text-sm font-medium text-brand-blue hover:underline">
              Practice on CP-31 Sheet <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      )}
    </div>
  )
}
