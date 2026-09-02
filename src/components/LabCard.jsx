import { Link } from 'react-router-dom'
import { ArrowRight, Beaker, Clock3, Glasses, Sparkles } from 'lucide-react'

const typeStyles = {
  '2D': 'border-cyan-400/30 bg-cyan-500/15 text-cyan-200',
  VR: 'border-indigo-400/30 bg-indigo-500/15 text-indigo-200',
}

export default function LabCard({ lab }) {
  const href = lab.type === 'VR' ? `/labs/vr/${lab.id}` : `/labs/2d/${lab.id}`
  const TypeIcon = lab.type === 'VR' ? Glasses : Beaker

  return (
    <article className="group overflow-hidden rounded-[28px] border border-white/10 bg-white/5 shadow-[0_20px_80px_rgba(2,6,23,0.35)] backdrop-blur-xl transition hover:-translate-y-1 hover:border-cyan-400/30">
      <div className="relative h-44 overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-cyan-950">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(34,211,238,0.25),_transparent_45%)]" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="rounded-3xl border border-white/10 bg-white/10 p-5 text-cyan-200 backdrop-blur-sm">
            <TypeIcon size={36} />
          </div>
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/10 to-transparent" />
        <div className={`absolute left-4 top-4 rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] ${typeStyles[lab.type] || typeStyles['2D']}`}>
          {lab.type}
        </div>
      </div>

      <div className="space-y-4 p-5">
        <div>
          <p className="text-sm text-slate-400">{lab.category}</p>
          <h3 className="text-lg font-semibold text-white">{lab.title}</h3>
        </div>

        <p className="text-sm leading-6 text-slate-400">{lab.description}</p>

        <div className="flex flex-wrap gap-2 text-xs text-slate-400">
          <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">{lab.status}</span>
          <span className="flex items-center gap-1 rounded-full border border-white/10 bg-white/5 px-3 py-1">
            <Clock3 size={12} />
            {lab.type === 'VR' ? 'VR experience' : `${lab.experimentCount} experiments`}
          </span>
        </div>

        <div className="flex items-center justify-between border-t border-white/10 pt-4">
          <div className="flex items-center gap-2 text-sm text-slate-300">
            <Sparkles size={14} className="text-cyan-300" />
            {lab.type === 'VR' ? 'APK download' : 'Interactive 2D lab'}
          </div>
          <Link
            to={href}
            className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-2 text-sm font-medium text-white transition hover:bg-cyan-500/20"
          >
            {lab.type === 'VR' ? 'Get VR Lab' : 'Open Lab'} <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </article>
  )
}
