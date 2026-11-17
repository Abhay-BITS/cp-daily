import { useEffect, useState } from 'react'
import { ArrowRight, Check, Clock, RotateCcw, Share2 } from 'lucide-react'
import { GAMES, MAX_POINTS } from '../data/games'

const COVER_SNIPPETS = [
  { text: 'O(N log N)', cls: 'top-5 right-[30%]' },
  { text: 'dp[i][j]', cls: 'bottom-6 right-[8%]' },
  { text: 'while (lo <= hi)', cls: 'top-[42%] right-[4%]' },
  { text: '2 × 10⁵', cls: 'bottom-5 right-[38%]' },
  { text: 'dsu.unite(u, v)', cls: 'top-6 right-[4%]' },
]

function useResetCountdown() {
  const calc = () => {
    const now = new Date()
    const next = new Date(now)
    next.setHours(24, 0, 0, 0)
    const s = Math.max(0, Math.floor((next - now) / 1000))
    const pad = (n) => String(n).padStart(2, '0')
    return `${pad(Math.floor(s / 3600))}:${pad(Math.floor((s % 3600) / 60))}:${pad(s % 60)}`
  }
  const [value, setValue] = useState(calc)
  useEffect(() => {
    const id = setInterval(() => setValue(calc()), 1000)
    return () => clearInterval(id)
  }, [])
  return value
}

function Tag({ children }) {
  return (
    <span className="px-2.5 py-1 rounded-md border border-brand-blue/60 bg-brand-blue-soft text-brand-blue text-xs">
      {children}
    </span>
  )
}

function Cover({ dayNumber, done, todayScore, onShare, today, countdown }) {
  const total = GAMES.length * MAX_POINTS
  const perfect = done === GAMES.length
  return (
    <div
      className="relative overflow-hidden rounded-tle-lg text-white"
      style={{ background: 'linear-gradient(115deg, #041434 0%, #0C2D6C 58%, #1D4FC4 100%)' }}
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-60"
        style={{
          backgroundImage: 'radial-gradient(rgba(255,255,255,0.12) 1px, transparent 1px)',
          backgroundSize: '22px 22px',
          maskImage: 'linear-gradient(90deg, transparent 0%, black 55%)',
          WebkitMaskImage: 'linear-gradient(90deg, transparent 0%, black 55%)',
        }}
      />
      {COVER_SNIPPETS.map((s) => (
        <span
          key={s.text}
          aria-hidden="true"
          className={`hidden md:block absolute font-mono text-xs px-2 py-1 rounded-md border border-white/15 bg-white/[0.06] text-white/55 ${s.cls}`}
        >
          {s.text}
        </span>
      ))}

      <div className="relative p-6 sm:p-8 md:max-w-[62%]">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
          <span className="inline-block px-3 py-1 rounded-full bg-[#3DDC97] text-brand-navy text-xs font-bold tracking-wide font-display">
            CP DAILY #{dayNumber}
          </span>
          <span className="text-xs text-white/70">{today}</span>
        </div>
        <h1 className="mt-4 font-display font-bold text-3xl sm:text-4xl leading-tight">
          {perfect ? 'Perfect day. See you tomorrow.' : "Today's Mental Gym"}
        </h1>
        <p className="mt-2 text-white/75 text-sm sm:text-base">
          Four quick games to sharpen your CP instincts. Same set for everyone, fresh every midnight.
        </p>

        <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3">
          <div>
            <div className="flex gap-1.5 mb-1.5">
              {GAMES.map((g, i) => (
                <span key={g.id} className={`h-1.5 w-10 rounded-full ${i < done ? 'bg-[#3DDC97]' : 'bg-white/20'}`} />
              ))}
            </div>
            <p className="text-xs text-white/70">
              <span className="font-mono text-white font-semibold">{done}/{GAMES.length}</span> games &middot;{' '}
              <span className="font-mono text-white font-semibold">{todayScore}</span>/{total} pts
            </p>
          </div>
          <p className="inline-flex items-center gap-1.5 text-xs text-white/70">
            <RotateCcw className="w-3.5 h-3.5" />
            Resets in <span className="font-mono text-white">{countdown}</span>
          </p>
          {done > 0 && (
            <button
              onClick={onShare}
              className="inline-flex items-center gap-1.5 h-[30px] px-3 rounded bg-white text-brand-navy text-xs font-semibold hover:bg-white/90 transition-colors cursor-pointer"
            >
              <Share2 className="w-3.5 h-3.5" />
              Share scorecard
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

function GameCard({ game, index, result, onPlay }) {
  const Icon = game.icon
  return (
    <button
      onClick={onPlay}
      className="group text-left flex flex-col bg-tle-card border border-b-secondary rounded-tle-lg p-5 transition-all duration-200 hover:border-brand-blue/60 hover:shadow-tle-hover cursor-pointer"
    >
      <div className="flex items-start justify-between mb-4">
        <span className="w-11 h-11 rounded-tle bg-brand-blue-soft text-brand-blue flex items-center justify-center">
          <Icon className="w-[22px] h-[22px]" />
        </span>
        <span className="font-mono text-xs text-t-tertiary">0{index + 1}</span>
      </div>
      <h3 className="text-lg font-semibold text-t-primary">{game.title}</h3>
      <p className="text-xs text-t-tertiary mb-2">{game.subtitle}</p>
      <p className="text-sm text-t-secondary leading-relaxed mb-4">{game.description}</p>
      <div className="flex flex-wrap gap-2 mb-5">
        {game.tags.map((t) => <Tag key={t}>{t}</Tag>)}
      </div>
      <div className="mt-auto flex items-center justify-between pt-4 border-t border-b-secondary">
        <span className="inline-flex items-center gap-1.5 text-xs text-t-tertiary">
          <Clock className="w-3.5 h-3.5" />
          {game.meta} &middot; {game.duration}
        </span>
        {result ? (
          <span className="inline-flex items-center gap-1.5 text-sm font-mono font-semibold text-semantic-green">
            <Check className="w-4 h-4" />
            {result.points}/{MAX_POINTS}
          </span>
        ) : (
          <span className="inline-flex items-center gap-1.5 h-8 px-4 rounded bg-brand-blue text-white text-sm font-medium group-hover:bg-brand-blue-hover transition-colors">
            Play
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
          </span>
        )}
      </div>
    </button>
  )
}

export default function GameHub({ dayNumber, results, todayScore, onGameSelect, onShare }) {
  const countdown = useResetCountdown()
  const done = Object.keys(results).length
  const today = new Date().toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short' })

  return (
    <div className="animate-fade-in">
      <Cover dayNumber={dayNumber} done={done} todayScore={todayScore} onShare={onShare} today={today} countdown={countdown} />

      <h2 className="mt-8 mb-5 pb-3 text-2xl font-semibold text-t-primary border-b border-b-secondary">Today's Lineup</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {GAMES.map((g, i) => (
          <GameCard key={g.id} game={g} index={i} result={results[g.id]} onPlay={() => onGameSelect(g.id)} />
        ))}
      </div>
    </div>
  )
}
