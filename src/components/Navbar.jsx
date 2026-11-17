import { useEffect, useRef, useState } from 'react'
import { ChevronDown, Flame, Sun, Moon, Menu, X, Share2, ListChecks, CalendarDays, BookOpen, Gamepad2 } from 'lucide-react'

const resources = [
  { label: 'CP-31 Sheet', desc: 'Curated practice by rating', icon: ListChecks },
  { label: 'Contest Tracker', desc: 'Upcoming contests in one place', icon: CalendarDays },
  { label: 'CP Digest', desc: 'Blogs, roadmaps and editorials', icon: BookOpen },
  { label: 'CP Daily', desc: 'Your 5-minute daily mental gym', icon: Gamepad2, active: true, isNew: true },
]

const activeShadow = { textShadow: '0 0 0.6px currentColor, 0 0 0.6px currentColor' }
const pillClass = 'inline-flex items-center gap-1.5 h-[30px] px-3 rounded border border-brand-blue bg-brand-blue-soft text-brand-blue text-xs font-medium whitespace-nowrap'

function ResourceItem({ item, onClick }) {
  const Icon = item.icon
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition-colors cursor-pointer ${
        item.active ? 'bg-brand-blue-soft' : 'hover:bg-tle-hover'
      }`}
    >
      <span className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${item.active ? 'bg-brand-blue text-white' : 'bg-tle-secondary text-t-secondary'}`}>
        <Icon className="w-[18px] h-[18px]" />
      </span>
      <span className="flex-1 min-w-0">
        <span className={`flex items-center gap-2 text-sm font-medium ${item.active ? 'text-brand-blue' : 'text-t-primary'}`}>
          {item.label}
          {item.isNew && <span className="text-[10px] font-semibold leading-none px-1.5 py-1 rounded bg-semantic-green text-white">New</span>}
        </span>
        <span className="block text-xs text-t-tertiary mt-0.5 truncate">{item.desc}</span>
      </span>
    </button>
  )
}

export default function Navbar({ streak, onShareClick, onLogoClick, theme, onToggleTheme }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [resOpen, setResOpen] = useState(false)
  const resRef = useRef(null)
  const isDark = theme === 'dark'

  useEffect(() => {
    if (!resOpen) return
    const close = (e) => { if (!resRef.current?.contains(e.target)) setResOpen(false) }
    const esc = (e) => { if (e.key === 'Escape') setResOpen(false) }
    document.addEventListener('mousedown', close)
    document.addEventListener('keydown', esc)
    return () => { document.removeEventListener('mousedown', close); document.removeEventListener('keydown', esc) }
  }, [resOpen])

  const goHome = () => { onLogoClick(); setMenuOpen(false); setResOpen(false) }

  return (
    <header className="sticky top-0 z-50 lg:px-16 lg:pt-2.5">
      <div className="relative flex items-center justify-between gap-3 min-h-[52px] px-2 lg:px-3 bg-tle-primary border-b border-b-secondary lg:border-b-0 lg:rounded-2xl lg:bg-[var(--tle-nav-glass)] lg:backdrop-blur-[16px] lg:backdrop-saturate-150">
        <button onClick={goHome} className="flex items-center gap-2 p-1 lg:p-2 cursor-pointer shrink-0">
          <img src="/tle-logo.svg" alt="TLE Eliminators" className="w-8 h-8 rounded" />
          <span className="font-display text-sm text-t-secondary">TLE Eliminators</span>
        </button>

        <nav className="hidden lg:flex items-center gap-2.5 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <a href="#" className="px-4 py-2 text-sm tracking-[-0.24px] text-t-secondary hover:text-brand-blue transition-colors">
            TLE Prime
          </a>
          <div ref={resRef} className="relative">
            <button
              onClick={() => setResOpen((o) => !o)}
              aria-expanded={resOpen}
              className="flex items-center gap-1 px-4 py-2 text-sm tracking-[-0.24px] text-brand-blue cursor-pointer"
              style={activeShadow}
            >
              Free Resources
              <ChevronDown className={`w-4 h-4 transition-transform ${resOpen ? 'rotate-180' : ''}`} />
            </button>
            {resOpen && (
              <div className="absolute left-1/2 -translate-x-1/2 top-full mt-2 w-72 p-2 bg-tle-card border border-b-secondary rounded-tle shadow-tle-hover animate-slide-down">
                {resources.map((r) => (
                  <ResourceItem key={r.label} item={r} onClick={r.active ? goHome : () => setResOpen(false)} />
                ))}
              </div>
            )}
          </div>
        </nav>

        <div className="flex items-center gap-2 lg:gap-2.5 ml-auto">
          <span className={`${pillClass} hidden sm:inline-flex`} title="Current streak">
            <Flame className="w-3.5 h-3.5" />
            {streak} day streak
          </span>
          <button onClick={onShareClick} className={`${pillClass} hidden sm:inline-flex hover:bg-brand-blue hover:text-white transition-colors cursor-pointer`}>
            <Share2 className="w-3.5 h-3.5" />
            Share
          </button>
          <button
            onClick={onToggleTheme}
            aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
            className="w-[30px] h-[30px] rounded flex items-center justify-center text-t-secondary hover:text-brand-blue hover:bg-tle-hover transition-colors cursor-pointer"
          >
            {isDark ? <Sun className="w-[18px] h-[18px]" /> : <Moon className="w-[18px] h-[18px]" />}
          </button>
          <button
            onClick={() => setMenuOpen((o) => !o)}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
            className="lg:hidden p-1 text-t-secondary cursor-pointer"
          >
            {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {menuOpen && (
          <div className="lg:hidden absolute top-full left-0 right-0 bg-tle-primary border-b border-b-secondary p-3 shadow-tle-hover animate-slide-down">
            <a href="#" className="block px-3 py-2.5 rounded-lg text-sm text-t-secondary hover:bg-tle-hover">TLE Prime</a>
            <p className="px-3 pt-3 pb-1 text-xs font-semibold text-brand-blue">Free Resources</p>
            {resources.map((r) => (
              <ResourceItem key={r.label} item={r} onClick={r.active ? goHome : () => setMenuOpen(false)} />
            ))}
            <div className="flex sm:hidden gap-2 pt-3 mt-2 border-t border-b-secondary">
              <span className={pillClass}><Flame className="w-3.5 h-3.5" />{streak} day streak</span>
              <button onClick={() => { setMenuOpen(false); onShareClick() }} className={`${pillClass} cursor-pointer`}>
                <Share2 className="w-3.5 h-3.5" />Share
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
