import { useState, useEffect, useCallback, useRef } from 'react'
import { wordleWords } from '../data/gameData'
import { Check, X, Delete, ArrowUpRight } from 'lucide-react'

const KEYBOARD_ROWS = [
  ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
  ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
  ['ENTER', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', 'BACK'],
]

const MAX_GUESSES = 6
const wordPoints = (g) => (g.won ? 100 - (g.guesses.length - 1) * 15 : 0)

function evaluateGuess(guess, answer) {
  const result = Array(answer.length).fill('absent')
  const answerChars = [...answer]
  const guessChars = [...guess]

  guessChars.forEach((ch, i) => {
    if (ch === answerChars[i]) {
      result[i] = 'correct'
      answerChars[i] = null
    }
  })
  guessChars.forEach((ch, i) => {
    if (result[i] !== 'correct') {
      const idx = answerChars.indexOf(ch)
      if (idx !== -1) {
        result[i] = 'present'
        answerChars[idx] = null
      }
    }
  })
  return result
}

export default function CPWordle({ onComplete }) {
  const [wordIdx, setWordIdx] = useState(0)
  const [gamesState, setGamesState] = useState(
    wordleWords.map(() => ({
      guesses: [],
      evaluations: [],
      currentGuess: '',
      gameOver: false,
      won: false,
      shakeRow: false,
    }))
  )
  const completedRef = useRef(false)

  const wordData = wordleWords[wordIdx]
  const answer = wordData.word
  const wordLen = answer.length
  const game = gamesState[wordIdx]

  const updateGame = useCallback((idx, patch) => {
    setGamesState(prev => prev.map((g, i) => i === idx ? { ...g, ...patch } : g))
  }, [])

  const submitGuess = useCallback(() => {
    if (game.gameOver) return
    if (game.currentGuess.length !== wordLen) {
      updateGame(wordIdx, { shakeRow: true })
      setTimeout(() => updateGame(wordIdx, { shakeRow: false }), 500)
      return
    }

    const guess = game.currentGuess.toUpperCase()
    const evaluation = evaluateGuess(guess, answer)
    const won = guess === answer
    const newGuesses = [...game.guesses, guess]
    const newEvals = [...game.evaluations, evaluation]
    const isOver = won || newGuesses.length >= MAX_GUESSES

    updateGame(wordIdx, {
      guesses: newGuesses,
      evaluations: newEvals,
      currentGuess: '',
      gameOver: isOver,
      won,
    })

  }, [game, wordIdx, answer, wordLen, updateGame])

  useEffect(() => {
    if (completedRef.current || !gamesState.every((g) => g.gameOver)) return
    completedRef.current = true
    const solved = gamesState.filter((g) => g.won).length
    onComplete?.({ points: gamesState.reduce((s, g) => s + wordPoints(g), 0), summary: `${solved}/${wordleWords.length} words` })
  }, [gamesState, onComplete])

  const addLetter = useCallback((letter) => {
    if (game.gameOver || game.currentGuess.length >= wordLen) return
    updateGame(wordIdx, { currentGuess: game.currentGuess + letter })
  }, [game, wordIdx, wordLen, updateGame])

  const removeLetter = useCallback(() => {
    if (game.gameOver || game.currentGuess.length === 0) return
    updateGame(wordIdx, { currentGuess: game.currentGuess.slice(0, -1) })
  }, [game, wordIdx, updateGame])

  useEffect(() => {
    const handler = (e) => {
      if (e.ctrlKey || e.metaKey || e.altKey) return
      const key = e.key.toUpperCase()
      if (key === 'ENTER') submitGuess()
      else if (key === 'BACKSPACE') removeLetter()
      else if (/^[A-Z]$/.test(key)) addLetter(key)
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [submitGuess, addLetter, removeLetter])

  const keyColors = {}
  game.guesses.forEach((guess, gi) => {
    ;[...guess].forEach((ch, ci) => {
      const status = game.evaluations[gi][ci]
      const prev = keyColors[ch]
      if (status === 'correct') keyColors[ch] = 'correct'
      else if (status === 'present' && prev !== 'correct') keyColors[ch] = 'present'
      else if (!prev) keyColors[ch] = 'absent'
    })
  })

  const tileClass = (status) => {
    switch (status) {
      case 'correct': return 'bg-semantic-green text-white border-semantic-green'
      case 'present': return 'bg-semantic-yellow text-gray-900 border-semantic-yellow'
      case 'absent': return 'bg-tle-hover text-t-tertiary border-tle-hover'
      default: return 'border-b-secondary'
    }
  }

  const keyClass = (key) => {
    const status = keyColors[key]
    switch (status) {
      case 'correct': return 'bg-semantic-green text-white border-semantic-green'
      case 'present': return 'bg-semantic-yellow text-gray-900 border-semantic-yellow'
      case 'absent': return 'bg-tle-hover text-t-tertiary border-tle-hover'
      default: return 'bg-tle-secondary border-b-secondary text-t-primary hover:bg-tle-hover'
    }
  }

  const handleKey = (key) => {
    if (key === 'ENTER') submitGuess()
    else if (key === 'BACK') removeLetter()
    else addLetter(key)
  }

  return (
    <div className="max-w-3xl space-y-6">
      <div className="flex flex-wrap items-center gap-2">
        {wordleWords.map((_, i) => (
          <button
            key={i}
            onClick={() => setWordIdx(i)}
            className={`h-8 px-3 rounded text-sm font-medium inline-flex items-center gap-1.5 border transition-colors cursor-pointer ${
              i === wordIdx ? 'border-brand-blue bg-brand-blue-soft text-brand-blue' : 'border-b-secondary text-t-secondary hover:text-t-primary'
            }`}
          >
            {gamesState[i].gameOver && (
              gamesState[i].won
                ? <Check className="w-3.5 h-3.5 text-semantic-green" />
                : <X className="w-3.5 h-3.5 text-semantic-red" />
            )}
            Word {i + 1}
            <span className="text-xs font-mono text-t-tertiary">{wordleWords[i].word.length}</span>
          </button>
        ))}
      </div>

      <div className="flex flex-col items-center gap-1.5">
        {Array.from({ length: MAX_GUESSES }).map((_, rowIdx) => {
          const isCurrentRow = rowIdx === game.guesses.length && !game.gameOver
          const isSubmittedRow = rowIdx < game.guesses.length
          const guess = isSubmittedRow
            ? game.guesses[rowIdx]
            : isCurrentRow
            ? game.currentGuess
            : ''
          const evaluation = isSubmittedRow ? game.evaluations[rowIdx] : null

          return (
            <div
              key={rowIdx}
              className={`flex gap-1.5 ${isCurrentRow && game.shakeRow ? 'animate-shake' : ''}`}
            >
              {Array.from({ length: wordLen }).map((_, colIdx) => {
                const letter = guess[colIdx] || ''
                const status = evaluation?.[colIdx]
                const filled = letter !== ''
                const borderClass = isCurrentRow && filled
                  ? 'border-t-tertiary'
                  : status
                  ? ''
                  : 'border-b-secondary'

                return (
                  <div
                    key={colIdx}
                    className={`w-11 h-11 sm:w-14 sm:h-14 border-2 rounded-lg flex items-center justify-center font-mono text-xl font-bold uppercase transition-all ${
                      status ? tileClass(status) : borderClass
                    } ${isSubmittedRow ? 'animate-flip' : ''}`}
                    style={isSubmittedRow ? { animationDelay: `${colIdx * 100}ms` } : undefined}
                  >
                    {letter}
                  </div>
                )
              })}
            </div>
          )
        })}
      </div>

      <div className="flex flex-col items-center gap-1.5">
        {KEYBOARD_ROWS.map((row, ri) => (
          <div key={ri} className="flex gap-1 w-full max-w-[440px] justify-center">
            {row.map((key) => (
              <button
                key={key}
                onClick={() => handleKey(key)}
                disabled={game.gameOver}
                aria-label={key === 'BACK' ? 'Backspace' : key}
                className={`border rounded-md font-mono text-sm font-medium cursor-pointer transition-colors disabled:cursor-default h-12 ${
                  key === 'ENTER' || key === 'BACK' ? 'flex-[1.5] text-[11px]' : 'flex-1 max-w-[40px]'
                } ${keyClass(key)}`}
              >
                {key === 'BACK' ? <Delete className="w-4 h-4 mx-auto" /> : key}
              </button>
            ))}
          </div>
        ))}
      </div>

      {game.gameOver && (
        <div className={`rounded-tle-lg border p-4 sm:p-5 animate-slide-up space-y-3 ${game.won ? 'border-semantic-green/40 bg-semantic-green-bg' : 'border-semantic-red/40 bg-semantic-red-bg'}`}>
          {game.won ? (
            <>
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center gap-1.5 font-semibold text-semantic-green"><Check className="w-4 h-4" />Solved in {game.guesses.length}/{MAX_GUESSES}</span>
                <span className="font-mono text-sm text-t-secondary">+{wordPoints(game)} pts</span>
              </div>
              <p className="text-t-secondary text-sm leading-relaxed">
                <span className="text-brand-blue font-semibold font-mono">{answer}</span>
                : {wordData.definition}
              </p>
            </>
          ) : (
            <>
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center gap-1.5 font-semibold text-semantic-red"><X className="w-4 h-4" />Out of guesses</span>
                <span className="font-mono text-sm text-t-secondary">+0 pts</span>
              </div>
              <p className="text-t-secondary text-sm leading-relaxed">
                The word was{' '}
                <span className="text-brand-blue font-semibold font-mono">{answer}</span>
                : {wordData.definition}
              </p>
            </>
          )}
          <a href="#" className="inline-flex items-center gap-1 text-brand-blue text-sm font-medium hover:underline">
            Read in CP Digest <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>
      )}
    </div>
  )
}
