import { useState, useEffect, useCallback, useRef } from 'react'
import { tleOrAcCards } from '../data/gameData'
import { Check, X, Clock, Keyboard, RotateCcw } from 'lucide-react'
import { MAX_POINTS } from '../data/games'

const TIMER_DURATION = 6000
const FEEDBACK_DURATION = 2600

export default function TLEorAC({ onComplete }) {
  const [phase, setPhase] = useState('ready')
  const [round, setRound] = useState(0)
  const [score, setScore] = useState(0)
  const [timeLeft, setTimeLeft] = useState(TIMER_DURATION)
  const [lastAnswer, setLastAnswer] = useState(null)
  const [answers, setAnswers] = useState([])
  const timerRef = useRef(null)
  const startTimeRef = useRef(null)
  const feedbackTimeoutRef = useRef(null)
  const answeredRef = useRef(false)

  const card = tleOrAcCards[round]

  const stopTimer = useCallback(() => {
    if (timerRef.current) {
      cancelAnimationFrame(timerRef.current)
      timerRef.current = null
    }
  }, [])

  const advanceRound = useCallback(() => {
    if (round + 1 >= tleOrAcCards.length) {
      setPhase('finished')
    } else {
      setRound(r => r + 1)
      setTimeLeft(TIMER_DURATION)
      setLastAnswer(null)
      setPhase('playing')
      answeredRef.current = false
    }
  }, [round])

  const handleAnswer = useCallback((guess) => {
    if (phase !== 'playing' || answeredRef.current) return
    answeredRef.current = true
    stopTimer()

    const correct = guess === card.answer
    const result = { cardId: card.id, guess, correct, explanation: card.explanation }
    setLastAnswer(result)
    setAnswers(prev => [...prev, result])
    if (correct) setScore(s => s + 1)

    setPhase('feedback')
    feedbackTimeoutRef.current = setTimeout(advanceRound, FEEDBACK_DURATION)
  }, [phase, card, stopTimer, advanceRound])

  const handleTimeout = useCallback(() => {
    if (answeredRef.current) return
    answeredRef.current = true
    stopTimer()

    const result = { cardId: card.id, guess: 'TIMEOUT', correct: false, explanation: card.explanation }
    setLastAnswer(result)
    setAnswers(prev => [...prev, result])

    setPhase('feedback')
    feedbackTimeoutRef.current = setTimeout(advanceRound, FEEDBACK_DURATION)
  }, [card, stopTimer, advanceRound])

  useEffect(() => {
    if (phase !== 'playing') return
    answeredRef.current = false
    startTimeRef.current = performance.now()

    const tick = (now) => {
      const elapsed = now - startTimeRef.current
      const remaining = Math.max(0, TIMER_DURATION - elapsed)
      setTimeLeft(remaining)
      if (remaining <= 0) { handleTimeout(); return }
      timerRef.current = requestAnimationFrame(tick)
    }

    timerRef.current = requestAnimationFrame(tick)
    return () => stopTimer()
  }, [phase, round, handleTimeout, stopTimer])

  useEffect(() => {
    if (phase !== 'playing') return
    const onKey = (e) => {
      if (e.key === 'ArrowLeft' || e.key === 't' || e.key === 'T') handleAnswer('TLE')
      if (e.key === 'ArrowRight' || e.key === 'a' || e.key === 'A') handleAnswer('AC')
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [phase, handleAnswer])

  useEffect(() => {
    if (phase === 'finished') {
      const correct = answers.filter(a => a.correct).length
      onComplete?.({ points: Math.round((correct / tleOrAcCards.length) * MAX_POINTS), summary: `${correct}/${tleOrAcCards.length} correct` })
    }
  }, [phase])

  useEffect(() => {
    return () => {
      stopTimer()
      if (feedbackTimeoutRef.current) clearTimeout(feedbackTimeoutRef.current)
    }
  }, [stopTimer])

  const startGame = () => {
    setPhase('playing')
    setRound(0)
    setScore(0)
    setTimeLeft(TIMER_DURATION)
    setAnswers([])
    setLastAnswer(null)
    answeredRef.current = false
  }

  const getRating = (s) => {
    if (s === tleOrAcCards.length) return 'Perfect complexity sense'
    if (s >= 8) return 'Excellent'
    if (s >= 6) return 'Solid run'
    return 'Keep practicing'
  }

  const pct = (timeLeft / TIMER_DURATION) * 100
  const timerColor = pct > 50 ? 'bg-brand-blue' : pct > 25 ? 'bg-semantic-yellow' : 'bg-semantic-red'
  const total = tleOrAcCards.length

  const verdictBtn = (kind) => kind === 'TLE'
    ? 'border-semantic-red/40 bg-semantic-red-bg text-semantic-red hover:border-semantic-red'
    : 'border-semantic-green/40 bg-semantic-green-bg text-semantic-green hover:border-semantic-green'

  if (phase === 'ready') {
    return (
      <div className="max-w-3xl">
        <div className="rounded-tle-lg border border-b-secondary bg-[var(--tle-code-bg)] p-5 sm:p-6">
          <h3 className="text-base font-semibold text-t-primary mb-3">How it works</h3>
          <ol className="space-y-2.5 text-sm text-t-secondary">
            {[
              'You get the constraints and a proposed approach.',
              'Assume roughly 10⁸ simple operations per second.',
              `Call it TLE or AC within ${TIMER_DURATION / 1000} seconds. Running out of time counts as wrong.`,
              `${total} rounds, ${MAX_POINTS / total} points per correct call.`,
            ].map((t, i) => (
              <li key={i} className="flex gap-3">
                <span className="w-5 h-5 shrink-0 rounded bg-brand-blue-soft text-brand-blue text-xs font-mono font-semibold flex items-center justify-center">{i + 1}</span>
                {t}
              </li>
            ))}
          </ol>
          <p className="mt-4 inline-flex items-center gap-2 text-xs text-t-tertiary">
            <Keyboard className="w-4 h-4" />
            Keyboard: <kbd className="font-mono px-1.5 rounded border border-b-secondary">T</kbd> or <kbd className="font-mono px-1.5 rounded border border-b-secondary">&larr;</kbd> for TLE,
            <kbd className="font-mono px-1.5 rounded border border-b-secondary">A</kbd> or <kbd className="font-mono px-1.5 rounded border border-b-secondary">&rarr;</kbd> for AC
          </p>
        </div>
        <button
          onClick={startGame}
          className="mt-5 inline-flex items-center gap-2 h-11 px-6 rounded bg-brand-blue text-white font-medium hover:bg-brand-blue-hover transition-colors cursor-pointer"
        >
          Start round 1
        </button>
      </div>
    )
  }

  if (phase === 'finished') {
    const finalScore = answers.filter(a => a.correct).length
    return (
      <div className="max-w-3xl animate-slide-up">
        <div className="flex flex-wrap items-end gap-x-6 gap-y-2 mb-6">
          <p className="font-mono text-5xl font-bold text-t-primary">{finalScore}<span className="text-t-tertiary text-3xl">/{total}</span></p>
          <div className="pb-1">
            <p className="text-lg font-semibold text-t-primary">{getRating(finalScore)}</p>
            <p className="text-sm text-t-secondary">{Math.round((finalScore / total) * MAX_POINTS)} of {MAX_POINTS} points</p>
          </div>
        </div>

        <h3 className="text-base font-semibold text-t-primary mb-3">Round review</h3>
        <div className="rounded-tle-lg border border-b-secondary divide-y divide-b-secondary overflow-hidden">
          {answers.map((a, i) => {
            const c = tleOrAcCards[i]
            return (
              <div key={i} className="p-4 flex gap-4">
                <span className={`mt-0.5 w-6 h-6 shrink-0 rounded-full flex items-center justify-center ${a.correct ? 'bg-semantic-green-bg text-semantic-green' : 'bg-semantic-red-bg text-semantic-red'}`}>
                  {a.correct ? <Check className="w-3.5 h-3.5" /> : <X className="w-3.5 h-3.5" />}
                </span>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <span className="text-sm text-t-primary">{c.approach}</span>
                    <span className={`text-[11px] font-mono font-semibold px-1.5 py-0.5 rounded ${c.answer === 'TLE' ? 'bg-semantic-red-bg text-semantic-red' : 'bg-semantic-green-bg text-semantic-green'}`}>{c.answer}</span>
                    {!a.correct && (
                      <span className="text-[11px] text-t-tertiary">you: {a.guess === 'TIMEOUT' ? 'timed out' : a.guess}</span>
                    )}
                  </div>
                  <p className="text-xs text-t-tertiary leading-relaxed">{c.explanation}</p>
                </div>
              </div>
            )
          })}
        </div>

        <button
          onClick={startGame}
          className="mt-5 inline-flex items-center gap-2 h-10 px-5 rounded border border-brand-blue bg-brand-blue-soft text-brand-blue text-sm font-medium hover:bg-brand-blue hover:text-white transition-colors cursor-pointer"
        >
          <RotateCcw className="w-4 h-4" />
          Play again (practice)
        </button>
      </div>
    )
  }

  return (
    <div className="max-w-3xl">
      <div className="flex items-center justify-between mb-2 text-sm font-mono">
        <span className="text-t-secondary">Round <span className="text-t-primary font-semibold">{round + 1}</span>/{total}</span>
        <span className="text-t-secondary">Correct <span className="text-t-primary font-semibold">{score}</span></span>
      </div>
      <div className="flex gap-1 mb-6">
        {tleOrAcCards.map((_, i) => {
          const a = answers[i]
          const cls = a ? (a.correct ? 'bg-semantic-green' : 'bg-semantic-red') : i === round ? 'bg-b-secondary' : 'bg-tle-hover'
          return (
            <div key={i} className={`relative h-1.5 flex-1 rounded-full overflow-hidden ${cls}`}>
              {i === round && phase === 'playing' && (
                <div className={`absolute inset-y-0 left-0 ${timerColor}`} style={{ width: `${pct}%` }} />
              )}
            </div>
          )
        })}
      </div>

      <div key={round} className="rounded-tle-lg border border-b-secondary bg-[var(--tle-code-bg)] p-5 sm:p-6 mb-5 animate-slide-up">
        <p className="text-xs font-semibold uppercase tracking-wider text-t-tertiary mb-1.5">Constraints</p>
        <p className="font-mono text-sm text-brand-blue mb-5">{card.constraints}</p>
        <p className="text-xs font-semibold uppercase tracking-wider text-t-tertiary mb-1.5">Proposed approach</p>
        <p className="text-lg text-t-primary">{card.approach}</p>
      </div>

      {phase === 'playing' && (
        <div className="grid grid-cols-2 gap-3 sm:gap-4">
          {['TLE', 'AC'].map((k) => (
            <button
              key={k}
              onClick={() => handleAnswer(k)}
              className={`rounded-tle border-2 py-4 transition-colors cursor-pointer active:scale-[0.98] ${verdictBtn(k)}`}
            >
              <span className="block font-mono text-2xl font-bold">{k}</span>
              <span className="block text-xs mt-0.5 opacity-80">{k === 'TLE' ? 'Time limit exceeded' : 'Accepted'}</span>
            </button>
          ))}
        </div>
      )}

      {phase === 'feedback' && lastAnswer && (
        <div className={`rounded-tle-lg border p-4 sm:p-5 animate-slide-up ${lastAnswer.correct ? 'border-semantic-green/40 bg-semantic-green-bg' : 'border-semantic-red/40 bg-semantic-red-bg'}`}>
          <p className={`inline-flex items-center gap-2 font-semibold mb-1 ${lastAnswer.correct ? 'text-semantic-green' : 'text-semantic-red'}`}>
            {lastAnswer.correct ? <Check className="w-5 h-5" /> : lastAnswer.guess === 'TIMEOUT' ? <Clock className="w-5 h-5" /> : <X className="w-5 h-5" />}
            {lastAnswer.correct ? 'Correct.' : lastAnswer.guess === 'TIMEOUT' ? "Time's up." : 'Wrong call.'}
            <span className="font-mono text-sm opacity-80">Verdict: {card.answer}</span>
          </p>
          <p className="text-sm text-t-secondary">{card.explanation}</p>
        </div>
      )}
    </div>
  )
}
