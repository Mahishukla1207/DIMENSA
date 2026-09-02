import { Link, NavLink } from 'react-router-dom'
import { Sparkles, BookOpen, LayoutGrid, UserCircle2 } from 'lucide-react'

const navItems = [
  { to: '/', label: 'Home' },
  { to: '/dashboard', label: 'Dashboard' },
  { to: '/labs', label: 'Labs' },
]

export default function Navbar() {
  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-slate-950/70 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-3">
          <div className="rounded-2xl border border-cyan-400/30 bg-cyan-500/10 p-2 text-cyan-300">
            <Sparkles size={18} />
          </div>
          <div>
            <p className="text-sm font-semibold tracking-[0.24em] text-slate-300 uppercase">DIMENSA</p>
            <p className="text-xs text-slate-400">2D & VR learning platform</p>
          </div>
        </Link>

        <nav className="hidden items-center gap-2 md:flex">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `rounded-full px-4 py-2 text-sm font-medium transition ${
                  isActive ? 'bg-white/10 text-white shadow-lg shadow-cyan-500/10' : 'text-slate-400 hover:bg-white/5 hover:text-white'
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button className="hidden rounded-full border border-white/10 bg-white/5 p-2 text-slate-300 sm:block">
            <BookOpen size={18} />
          </button>
          <button className="rounded-full border border-white/10 bg-white/5 p-2 text-slate-300">
            <LayoutGrid size={18} />
          </button>
          <button className="rounded-full border border-white/10 bg-gradient-to-br from-cyan-500 to-indigo-500 p-2 text-white">
            <UserCircle2 size={18} />
          </button>
        </div>
      </div>
    </header>
  )
}
