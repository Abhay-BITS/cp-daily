import { useState, useCallback, useEffect, useMemo } from 'react'
import { ChevronRight } from 'lucide-react'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import GameHub from './components/GameHub'
import ShareModal from './components/ShareModal'
import Footer from './components/Footer'
import TLEorAC from './games/TLEorAC'
import DebugCode from './games/DebugCode'
import GuessTopic from './games/GuessTopic'
import CPWordle from './games/CPWordle'
import { gameById, MAX_POINTS } from './data/games'

const DAY_NUMBER = 42
const BASE_STREAK = 4

const GAME_COMPONENTS = { 'tle-ac': TLEorAC, debug: DebugCode, topic: GuessTopic, wordle: CPWordle }

function getInitialTheme() {
  try {
    const stored = localStorage.getItem('tle-theme')
    if (stored === 'dark' || stored === 'light') return stored
  } catch {}
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

function GameHeader({ game, result, onBack }) {
  const Icon = game.icon
  return (
    <div className="mb-6 pb-5 border-b border-b-secondary">
      <nav className="flex items-center gap-1 text-sm mb-4">
        <button onClick={onBack} className="text-brand-blue hover:underline cursor-pointer">CP Daily</button>
        <ChevronRight className="w-4 h-4 text-t-tertiary" />
        <span className="text-t-secondary">{game.title}</span>
      </nav>
      <div className="flex flex-wrap items-center gap-4">
        <span className="w-11 h-11 rounded-tle bg-brand-blue-soft text-brand-blue flex items-center justify-center shrink-0">
          <Icon className="w-[22px] h-[22px]" />
        </span>
        <div className="flex-1 min-w-0">
          <h1 className="text-2xl font-semibold text-t-primary">{game.title}</h1>
          <p className="text-sm text-t-secondary">{game.subtitle} &middot; {game.meta} &middot; {game.duration}</p>
        </div>
        {result && (
          <span className="text-sm font-mono font-semibold px-3 py-1.5 rounded bg-semantic-green-bg text-semantic-green">
            {result.points}/{MAX_POINTS} pts
          </span>
        )}
      </div>
    </div>
  )
}

export default function App() {
  const [activeGame, setActiveGame] = useState(null)
  const [results, setResults] = useState({})
  const [showShare, setShowShare] = useState(false)
  const [theme, setTheme] = useState(getInitialTheme)

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    try { localStorage.setItem('tle-theme', theme) } catch {}
  }, [theme])

  useEffect(() => { window.scrollTo({ top: 0 }) }, [activeGame])

  const streak = BASE_STREAK + (Object.keys(results).length > 0 ? 1 : 0)
  const todayScore = useMemo(() => Object.values(results).reduce((s, r) => s + r.points, 0), [results])

  const handleComplete = useCallback((gameId, result) => {
    setResults((prev) => (prev[gameId] ? prev : { ...prev, [gameId]: result }))
  }, [])

  const game = activeGame ? gameById(activeGame) : null
  const GameComponent = activeGame ? GAME_COMPONENTS[activeGame] : null

  return (
    <div className="min-h-screen bg-tle-home flex flex-col">
      <Navbar
        streak={streak}
        onShareClick={() => setShowShare(true)}
        onLogoClick={() => setActiveGame(null)}
        theme={theme}
        onToggleTheme={() => setTheme((t) => (t === 'dark' ? 'light' : 'dark'))}
      />

      <div className="flex-1 w-full max-w-[1440px] mx-auto flex gap-4 px-3 sm:px-4 lg:px-16 pt-4 pb-24 lg:pb-14">
        <Sidebar
          activeGame={activeGame}
          onGameSelect={setActiveGame}
          results={results}
          todayScore={todayScore}
          streak={streak}
          bestStreak={Math.max(streak, 7)}
        />

        <main className="flex-1 min-w-0 bg-tle-card border border-b-secondary rounded-tle-lg p-4 sm:p-6 lg:p-8">
          {game ? (
            <div key={game.id} className="animate-fade-in">
              <GameHeader game={game} result={results[game.id]} onBack={() => setActiveGame(null)} />
              <GameComponent onComplete={(r) => handleComplete(game.id, r)} />
            </div>
          ) : (
            <GameHub
              dayNumber={DAY_NUMBER}
              results={results}
              todayScore={todayScore}
              streak={streak}
              onGameSelect={setActiveGame}
              onShare={() => setShowShare(true)}
            />
          )}
        </main>
      </div>

      <Footer />

      <ShareModal
        isOpen={showShare}
        onClose={() => setShowShare(false)}
        results={results}
        todayScore={todayScore}
        streak={streak}
        dayNumber={DAY_NUMBER}
      />
    </div>
  )
}
