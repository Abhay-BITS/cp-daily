import { useState, useEffect } from 'react'
import { Clipboard, Check, X, Flame } from 'lucide-react'
import { GAMES, MAX_POINTS } from '../data/games'

export default function ShareModal({ isOpen, onClose, results, todayScore, streak, dayNumber }) {
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    if (!isOpen) { setCopied(false); return }
    const onKey = (e) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [isOpen, onClose])

  if (!isOpen) return null

  const done = Object.keys(results).length
  const total = GAMES.length * MAX_POINTS
  const bar = (pts) => {
    const filled = Math.round((pts / MAX_POINTS) * 10)
    return '█'.repeat(filled) + '░'.repeat(10 - filled)
  }

  const shareText = [
    `TLE CP Daily #${dayNumber}  |  ${todayScore}/${total} pts`,
    '',
    ...GAMES.map((g) => {
      const r = results[g.id]
      return `${g.short.padEnd(7)} ${r ? bar(r.points) : '░'.repeat(10)}  ${r ? r.summary : 'not played'}`
    }),
    '',
    `${streak}-day streak`,
    'tle-eliminators.com/cp-daily',
  ].join('\n')

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shareText)
    } catch {
      const ta = document.createElement('textarea')
      ta.value = shareText
      document.body.appendChild(ta)
      ta.select()
      document.execCommand('copy')
      document.body.removeChild(ta)
    }
    setCopied(true)
    setTimeout(() => setCopied(false), 2500)
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4" onClick={onClose} role="dialog" aria-modal="true" aria-label="Share scorecard">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
      <div className="relative w-full max-w-md bg-tle-card border border-b-secondary rounded-tle-lg shadow-tle-hover animate-slide-up overflow-hidden" onClick={(e) => e.stopPropagation()}>
        <div className="relative px-6 pt-6 pb-5 text-white" style={{ background: 'linear-gradient(115deg, #041434 0%, #0C2D6C 60%, #1D4FC4 100%)' }}>
          <button onClick={onClose} aria-label="Close" className="absolute top-4 right-4 text-white/70 hover:text-white cursor-pointer">
            <X className="w-5 h-5" />
          </button>
          <span className="inline-block px-2.5 py-0.5 rounded-full bg-[#3DDC97] text-brand-blue-navy text-[11px] font-bold font-display">CP DAILY #{dayNumber}</span>
          <p className="mt-3 font-mono text-4xl font-bold">{todayScore}<span className="text-white/50 text-2xl">/{total}</span></p>
          <p className="mt-1 text-sm text-white/75 inline-flex items-center gap-1.5">
            {done}/{GAMES.length} games
            <span className="text-white/40">&middot;</span>
            <Flame className="w-3.5 h-3.5" />{streak}-day streak
          </p>
        </div>

        <div className="p-6">
          <ul className="space-y-3 mb-6">
            {GAMES.map((g) => {
              const r = results[g.id]
              const Icon = g.icon
              return (
                <li key={g.id} className="flex items-center gap-3">
                  <Icon className={`w-4 h-4 shrink-0 ${r ? 'text-brand-blue' : 'text-t-tertiary'}`} />
                  <span className="w-36 shrink-0 text-sm text-t-secondary whitespace-nowrap">{g.title}</span>
                  <span className="flex-1 h-1.5 rounded-full bg-tle-hover overflow-hidden">
                    <span className="block h-full rounded-full bg-brand-blue" style={{ width: `${r ? (r.points / MAX_POINTS) * 100 : 0}%` }} />
                  </span>
                  <span className={`w-12 text-right text-sm font-mono ${r ? 'text-t-primary' : 'text-t-tertiary'}`}>{r ? r.points : '-'}</span>
                </li>
              )
            })}
          </ul>

          <button
            onClick={handleCopy}
            className={`w-full h-11 rounded font-medium text-sm inline-flex items-center justify-center gap-2 transition-colors cursor-pointer ${
              copied ? 'bg-semantic-green-bg text-semantic-green border border-semantic-green/40' : 'bg-brand-blue text-white hover:bg-brand-blue-hover'
            }`}
          >
            {copied ? <><Check className="w-4 h-4" />Copied. Paste it in Discord or WhatsApp</> : <><Clipboard className="w-4 h-4" />Copy scorecard</>}
          </button>
        </div>
      </div>
    </div>
  )
}
