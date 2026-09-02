import { Link, useParams } from 'react-router-dom'
import { ArrowLeft, FlaskConical, Play } from 'lucide-react'
import { getSubject } from '../lib/labs'

export default function LabDetailPage() {
  const { subjectId } = useParams()
  const subject = getSubject(subjectId)

  if (!subject) {
    return (
      <main className="min-h-screen bg-[#020617] px-4 py-16 text-slate-100">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="text-2xl font-semibold text-white">Lab not found</h1>
          <Link to="/labs" className="mt-4 inline-block text-cyan-300 hover:text-cyan-200">
            Back to labs
          </Link>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-[#020617] px-4 py-16 text-slate-100 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl space-y-8">
        <Link to="/labs" className="inline-flex items-center gap-2 text-sm text-slate-400 transition hover:text-white">
          <ArrowLeft size={16} />
          Back to labs
        </Link>

        <div className="space-y-3">
          <div className="flex flex-wrap items-center gap-3">
            <span className="rounded-full border border-cyan-400/30 bg-cyan-500/15 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-cyan-200">
              {subject.type}
            </span>
            <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-300">
              {subject.category}
            </span>
          </div>
          <h1 className="text-3xl font-semibold text-white sm:text-4xl">{subject.title}</h1>
          <p className="max-w-3xl text-slate-400">{subject.description}</p>
          <p className="text-sm text-slate-500">{subject.experimentCount} experiments available</p>
        </div>

        <div className="grid gap-4">
          {subject.experiments.map((experiment, index) => (
            <Link
              key={experiment.id}
              to={`/labs/2d/${subject.id}/${experiment.id}`}
              className="group flex items-center justify-between rounded-[24px] border border-white/10 bg-white/5 p-5 transition hover:border-cyan-400/30 hover:bg-white/[0.07]"
            >
              <div className="flex items-start gap-4">
                <div className="rounded-2xl border border-cyan-400/20 bg-cyan-500/10 p-3 text-cyan-300">
                  <FlaskConical size={18} />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.24em] text-slate-500">Experiment {index + 1}</p>
                  <h2 className="mt-1 text-lg font-semibold text-white">{experiment.title}</h2>
                </div>
              </div>
              <span className="inline-flex items-center gap-2 rounded-full bg-cyan-500/15 px-4 py-2 text-sm font-medium text-cyan-200 transition group-hover:bg-cyan-500/25">
                Launch <Play size={14} />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </main>
  )
}
