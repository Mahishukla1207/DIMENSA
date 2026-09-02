import { useMemo, useState } from 'react'
import { getAllLabs } from '../lib/labs'
import LabCard from '../components/LabCard'

const labs = getAllLabs()
const categories = ['All', ...new Set(labs.map((lab) => lab.category))]
const types = ['All', '2D', 'VR']

export default function LabsPage() {
  const [query, setQuery] = useState('')
  const [activeCategory, setActiveCategory] = useState('All')
  const [activeType, setActiveType] = useState('All')

  const filteredLabs = useMemo(() => {
    return labs.filter((lab) => {
      const matchesCategory = activeCategory === 'All' || lab.category === activeCategory
      const matchesType = activeType === 'All' || lab.type === activeType
      const matchesQuery = `${lab.title} ${lab.description} ${lab.category}`.toLowerCase().includes(query.toLowerCase())
      return matchesCategory && matchesType && matchesQuery
    })
  }, [activeCategory, activeType, query])

  return (
    <main className="min-h-screen bg-[#020617] px-4 py-16 text-slate-100 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl space-y-8">
        <div className="space-y-4">
          <p className="text-sm uppercase tracking-[0.24em] text-cyan-300">DIMENSA Lab catalog</p>
          <h1 className="text-3xl font-semibold text-white sm:text-4xl">Discover interactive experiments</h1>
          <p className="max-w-2xl text-slate-400">
            Browse {labs.length} lab modules with 2D HTML simulations and VR experiences ready to launch.
          </p>
        </div>

        <div className="flex flex-col gap-4">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search laboratories"
            className="w-full rounded-full border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-200 outline-none ring-0 placeholder:text-slate-500 lg:max-w-md"
          />
          <div className="flex flex-wrap gap-2">
            {types.map((type) => (
              <button
                key={type}
                onClick={() => setActiveType(type)}
                className={`rounded-full px-4 py-2 text-sm transition ${activeType === type ? 'bg-indigo-500 text-white' : 'border border-white/10 bg-white/5 text-slate-300 hover:bg-white/10'}`}
              >
                {type}
              </button>
            ))}
          </div>
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`rounded-full px-4 py-2 text-sm transition ${activeCategory === category ? 'bg-cyan-500 text-white' : 'border border-white/10 bg-white/5 text-slate-300 hover:bg-white/10'}`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {filteredLabs.map((lab) => (
            <LabCard key={`${lab.type}-${lab.id}`} lab={lab} />
          ))}
        </div>

        {filteredLabs.length === 0 && (
          <p className="rounded-[24px] border border-white/10 bg-white/5 p-8 text-center text-slate-400">
            No labs match your search. Try another keyword or filter.
          </p>
        )}
      </div>
    </main>
  )
}
