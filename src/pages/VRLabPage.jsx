import { Link, useParams } from 'react-router-dom'
import { ArrowLeft, Download, Glasses, Smartphone } from 'lucide-react'
import { formatBytes, getVRLab } from '../lib/labs'

export default function VRLabPage() {
  const { labId } = useParams()
  const lab = getVRLab(labId)

  if (!lab) {
    return (
      <main className="min-h-screen bg-[#020617] px-4 py-16 text-slate-100">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="text-2xl font-semibold text-white">VR lab not found</h1>
          <Link to="/labs" className="mt-4 inline-block text-cyan-300 hover:text-cyan-200">
            Back to labs
          </Link>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(99,102,241,0.18),_transparent_32%),#020617] px-4 py-16 text-slate-100 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl space-y-8">
        <Link to="/labs" className="inline-flex items-center gap-2 text-sm text-slate-400 transition hover:text-white">
          <ArrowLeft size={16} />
          Back to labs
        </Link>

        <div className="rounded-[32px] border border-white/10 bg-white/5 p-8 backdrop-blur-xl">
          <div className="flex flex-wrap items-center gap-3">
            <span className="rounded-full border border-indigo-400/30 bg-indigo-500/15 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-indigo-200">
              VR
            </span>
            <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-300">
              {lab.category}
            </span>
          </div>

          <div className="mt-6 flex items-start gap-4">
            <div className="rounded-2xl border border-indigo-400/20 bg-indigo-500/10 p-4 text-indigo-300">
              <Glasses size={28} />
            </div>
            <div>
              <h1 className="text-3xl font-semibold text-white sm:text-4xl">{lab.title}</h1>
              <p className="mt-3 max-w-2xl text-slate-400">{lab.description}</p>
            </div>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <div className="rounded-[24px] border border-white/10 bg-slate-950/60 p-5">
              <div className="flex items-center gap-3 text-slate-300">
                <Smartphone size={18} className="text-cyan-300" />
                <span className="font-medium">Android APK</span>
              </div>
              <p className="mt-2 text-sm text-slate-500">File size: {formatBytes(lab.apkSize)}</p>
              <a
                href={lab.apkPath}
                download
                className="mt-4 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-indigo-500 to-cyan-500 px-5 py-3 text-sm font-semibold text-white transition hover:opacity-90"
              >
                Download APK <Download size={16} />
              </a>
            </div>

            <div className="rounded-[24px] border border-white/10 bg-slate-950/60 p-5">
              <p className="text-sm font-medium text-white">Installation steps</p>
              <ol className="mt-3 list-decimal space-y-2 pl-5 text-sm text-slate-400">
                <li>Download the APK to your Android device or VR headset.</li>
                <li>Enable installation from unknown sources if prompted.</li>
                <li>Open the APK and install Car Simulation.</li>
                <li>Launch the app on your VR-compatible Android device.</li>
              </ol>
            </div>
          </div>

          {lab.learningObjectives?.length > 0 && (
            <div className="mt-8">
              <p className="text-sm uppercase tracking-[0.24em] text-cyan-300">Learning objectives</p>
              <ul className="mt-3 space-y-2">
                {lab.learningObjectives.map((objective) => (
                  <li key={objective} className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-300">
                    {objective}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </main>
  )
}
