import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Clock3, Heart, History, Sparkles, TrendingUp } from 'lucide-react'
import { getAllLabs } from '../lib/labs'

const labs = getAllLabs()
const totalExperiments = labs.reduce((sum, lab) => sum + (lab.experimentCount || 0), 0)

const statCards = [
  { label: 'Lab modules', value: String(labs.length), icon: Sparkles },
  { label: '2D experiments', value: String(totalExperiments - 1), icon: Clock3 },
  { label: 'VR experiences', value: '1', icon: Heart },
  { label: 'Subject areas', value: String(new Set(labs.map((l) => l.category)).size), icon: History },
]

export default function DashboardPage() {
  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(34,211,238,0.12),_transparent_32%),#020617] px-4 py-16 text-slate-100 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl space-y-8">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.24em] text-cyan-300">DIMENSA dashboard</p>
            <h1 className="mt-2 text-3xl font-semibold text-white sm:text-4xl">Welcome back, learner</h1>
            <p className="mt-3 max-w-2xl text-slate-400">Continue where you left off and launch your next 2D or VR experiment.</p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-300">
            <div className="flex items-center gap-2">
              <TrendingUp size={16} className="text-cyan-300" />
              {totalExperiments} experiments ready to explore.
            </div>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {statCards.map((card) => {
            const Icon = card.icon
            return (
              <motion.div key={card.label} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="rounded-[24px] border border-white/10 bg-white/5 p-5 backdrop-blur-xl">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-400">{card.label}</p>
                    <p className="mt-2 text-2xl font-semibold text-white">{card.value}</p>
                  </div>
                  <div className="rounded-2xl border border-cyan-400/20 bg-cyan-500/10 p-3 text-cyan-300">
                    <Icon size={18} />
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>

        <section className="rounded-[32px] border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.24em] text-cyan-300">Quick access</p>
              <h2 className="mt-2 text-2xl font-semibold text-white">Continue your exploration</h2>
            </div>
            <Link to="/labs" className="text-sm text-cyan-300 hover:text-cyan-200">
              View all labs
            </Link>
          </div>
          <div className="grid gap-4 lg:grid-cols-3">
            {labs.slice(0, 3).map((lab) => (
              <Link
                key={lab.id}
                to={lab.type === 'VR' ? `/labs/vr/${lab.id}` : `/labs/2d/${lab.id}`}
                className="rounded-[24px] border border-white/10 bg-slate-950/60 p-4 transition hover:border-cyan-400/30"
              >
                <p className="text-sm text-cyan-300">{lab.category} · {lab.type}</p>
                <h3 className="mt-2 text-lg font-semibold text-white">{lab.title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-400">{lab.description}</p>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </main>
  )
}
