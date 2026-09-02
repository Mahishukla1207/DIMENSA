import { Link, useParams } from 'react-router-dom'
import { ArrowLeft, ExternalLink } from 'lucide-react'
import { getExperiment, getLabAssetPath } from '../lib/labs'

export default function LabViewerPage() {
  const { subjectId, experimentId } = useParams()
  const result = getExperiment(subjectId, experimentId)

  if (!result) {
    return (
      <main className="min-h-screen bg-[#020617] px-4 py-16 text-slate-100">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="text-2xl font-semibold text-white">Experiment not found</h1>
          <Link to="/labs" className="mt-4 inline-block text-cyan-300 hover:text-cyan-200">
            Back to labs
          </Link>
        </div>
      </main>
    )
  }

  const { subject, experiment } = result
  const assetPath = getLabAssetPath(subject.id, experiment.entry)

  return (
    <main className="flex min-h-screen flex-col bg-[#020617] text-slate-100">
      <header className="border-b border-white/10 bg-slate-950/90 px-4 py-3 backdrop-blur-xl sm:px-6">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <Link
              to={`/labs/2d/${subject.id}`}
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-2 text-sm text-slate-300 transition hover:bg-white/10"
            >
              <ArrowLeft size={14} />
              {subject.title}
            </Link>
            <div>
              <p className="text-xs uppercase tracking-[0.24em] text-cyan-300">DIMENSA Lab</p>
              <h1 className="text-sm font-semibold text-white sm:text-base">{experiment.title}</h1>
            </div>
          </div>
          <a
            href={assetPath}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-2 text-sm text-slate-300 transition hover:bg-white/10"
          >
            Open in new tab <ExternalLink size={14} />
          </a>
        </div>
      </header>

      <iframe
        title={experiment.title}
        src={assetPath}
        className="min-h-0 flex-1 w-full border-0 bg-white"
        allow="fullscreen"
      />
    </main>
  )
}
