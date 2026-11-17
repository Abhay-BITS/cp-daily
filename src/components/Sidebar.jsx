import { Check, LayoutGrid } from 'lucide-react'
import { GAMES, MAX_POINTS } from '../data/games'

export default function Sidebar({ activeGame, onGameSelect, results, todayScore, streak, bestStreak }) {
  const doneCount = Object.keys(results).length

  return (
    <>
      <aside className="hidden lg:block w-72 shrink-0">
        <div className="h-full bg-tle-card border border-b-secondary rounded-tle-lg">
          <div className="sticky top-[72px] p-4">
            <div className="flex items-center justify-between px-2 mb-3">
              <h2 className="text-lg font-semibold text-t-primary">Today's Games</h2>
              <span className="text-xs font-mono text-t-tertiary">{doneCount}/{GAMES.length}</span>
            </div>

            <button
              onClick={() => onGameSelect(null)}
              className={`w-full flex items-center gap-3 px-2 py-2.5 rounded-lg text-sm transition-colors cursor-pointer ${
                !activeGame ? 'text-brand-blue font-medium' : 'text-t-secondary hover:text-t-primary'
              }`}
            >
              <LayoutGrid className="w-[18px] h-[18px] shrink-0" />
              <span className="flex-1 text-left">Overview</span>
            </button>

            {GAMES.map((game) => {
              const isActive = activeGame === game.id
              const result = results[game.id]
              const Icon = game.icon
              return (
                <button
                  key={game.id}
                  onClick={() => onGameSelect(game.id)}
                  className={`w-full flex items-center gap-3 px-2 py-2.5 rounded-lg text-sm transition-colors cursor-pointer ${
                    isActive ? 'text-brand-blue font-medium' : 'text-t-secondary hover:text-t-primary'
                  }`}
                >
                  <Icon className="w-[18px] h-[18px] shrink-0" />
                  <span className="flex-1 text-left">{game.title}</span>
                  {result ? (
                    <span className="inline-flex items-center gap-1 text-xs font-mono text-semantic-green">
                      <Check className="w-3.5 h-3.5" />
                      {result.points}
                    </span>
                  ) : (
                    <span className="text-xs text-t-tertiary">{game.duration}</span>
                  )}
                </button>
              )
            })}

            <div className="border-t border-b-secondary my-4" />

            <h3 className="px-2 mb-3 text-base font-semibold text-t-primary">Your Stats</h3>
            <dl className="px-2 space-y-3 text-sm">
              {[
                ["Today's score", `${todayScore}/${GAMES.length * MAX_POINTS}`],
                ['Current streak', `${streak} days`],
                ['Best streak', `${bestStreak} days`],
              ].map(([k, v]) => (
                <div key={k} className="flex items-center justify-between">
                  <dt className="text-t-secondary">{k}</dt>
                  <dd className="font-mono font-semibold text-t-primary">{v}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </aside>

      <nav className="lg:hidden fixed bottom-0 inset-x-0 z-40 bg-tle-primary border-t border-b-secondary flex justify-around px-2 pt-1.5 pb-[max(0.375rem,env(safe-area-inset-bottom))]">
        {GAMES.map((game) => {
          const isActive = activeGame === game.id
          const Icon = game.icon
          return (
            <button
              key={game.id}
              onClick={() => onGameSelect(game.id)}
              className={`relative flex flex-col items-center gap-0.5 px-3 py-1 text-[11px] font-medium cursor-pointer ${
                isActive ? 'text-brand-blue' : 'text-t-tertiary'
              }`}
            >
              <Icon className="w-5 h-5" />
              {game.short}
              {results[game.id] && <span className="absolute top-0 right-2 w-2 h-2 rounded-full bg-semantic-green" />}
            </button>
          )
        })}
      </nav>
    </>
  )
}
