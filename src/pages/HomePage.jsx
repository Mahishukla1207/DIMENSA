import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight, Brain, Compass, ShieldCheck, Sparkles } from 'lucide-react'
import { getAllLabs } from '../lib/labs'
import LabCard from '../components/LabCard'

const labs = getAllLabs()

const highlights = [
  { title: 'Interactive labs', description: 'Launch 2D HTML simulations and VR experiences from one unified DIMENSA portal.' },
  { title: 'Curriculum ready', description: 'AI/ML, blockchain, cryptography, data structures, electrical engineering, and more.' },
  { title: 'Built for scale', description: 'Metadata-driven catalog with experiment-level navigation and embedded viewers.' },
]

export default function HomePage() {
  const featured = labs.slice(0, 3)

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(34,211,238,0.16),_transparent_32%),linear-gradient(135deg,_#020617,_#0f172a_45%,_#111827)] text-slate-100">
      <section className="mx-auto flex max-w-7xl flex-col gap-8 px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-500/10 px-4 py-2 text-sm text-cyan-200">
              <Sparkles size={16} />
              DIMENSA virtual learning
            </div>
            <h1 className="max-w-3xl text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl">
              Explore immersive 2D and VR labs in one modern platform.
            </h1>
            <p className="max-w-2xl text-lg leading-8 text-slate-400">
              Access interactive HTML experiments and download VR simulations for engineering and computer science courses.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link to="/dashboard" className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-cyan-500 to-indigo-500 px-5 py-3 font-semibold text-white transition hover:opacity-90">
                Open dashboard <ArrowRight size={16} />
              </Link>
              <Link to="/labs" className="rounded-full border border-white/10 bg-white/5 px-5 py-3 font-semibold text-slate-200 transition hover:bg-white/10">
                Browse labs
              </Link>
            </div>
          </div>

          <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6, delay: 0.1 }} className="rounded-[32px] border border-white/10 bg-white/10 p-5 shadow-[0_30px_120px_rgba(2,8,23,0.45)] backdrop-blur-xl">
            <div className="rounded-[28px] border border-white/10 bg-slate-950/70 p-6">
              <div className="mb-6 flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-400">Available on DIMENSA</p>
                  <p className="text-xl font-semibold text-white">{labs.length} lab modules</p>
                </div>
                <div className="rounded-full border border-emerald-400/20 bg-emerald-500/10 px-3 py-1 text-sm text-emerald-300">
                  Live
                </div>
              </div>
              <div className="space-y-3">
                {featured.map((lab, index) => (
                  <div key={lab.id} className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="rounded-xl bg-cyan-500/15 p-2 text-cyan-300">
                        {index === 0 ? <Compass size={16} /> : index === 1 ? <Brain size={16} /> : <ShieldCheck size={16} />}
                      </div>
                      <span className="text-sm text-slate-300">{lab.title}</span>
                    </div>
                    <span className="text-xs uppercase tracking-[0.24em] text-slate-500">{lab.type}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
        <div className="grid gap-4 md:grid-cols-3">
          {highlights.map((item) => (
            <div key={item.title} className="rounded-[24px] border border-white/10 bg-white/5 p-5 backdrop-blur-xl">
              <h2 className="text-lg font-semibold text-white">{item.title}</h2>
              <p className="mt-2 text-sm leading-6 text-slate-400">{item.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-24 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <p className="text-sm uppercase tracking-[0.24em] text-cyan-300">Featured labs</p>
            <h2 className="mt-2 text-3xl font-semibold text-white">Start learning with DIMENSA</h2>
          </div>
          <Link to="/labs" className="text-sm font-medium text-slate-300 transition hover:text-white">
            View all
          </Link>
        </div>
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {featured.map((lab) => (
            <LabCard key={`${lab.type}-${lab.id}`} lab={lab} />
          ))}
        </div>
      </section>
    </main>
  )
}
