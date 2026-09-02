import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.resolve(__dirname, '../2D things/2D things')
const output = path.resolve(__dirname, '../src/data/labs.json')
const publicRoot = path.resolve(__dirname, '../public/labs/2d')

const SKIP_FOLDERS = new Set(['aiml', 'beel', 'bl', 'cr', 'da', 'ds', 'daa'])

const SUBJECT_META = {
  'artificial-intelligence-machine-learning': {
    title: 'Artificial Intelligence & Machine Learning',
    category: 'Computer Science',
    description: 'Interactive AI and ML simulations covering NumPy, pandas, neural networks, and model training.',
  },
  'basic-electrical-electronics-lab': {
    title: 'Basic Electrical & Electronics Lab',
    category: 'Engineering',
    description: 'Hands-on electrical and electronics experiments with theory, procedure, and simulations.',
  },
  'blockchain-lab': {
    title: 'Blockchain Lab',
    category: 'Computer Science',
    description: 'Explore blockchain concepts through guided cryptographic and distributed ledger experiments.',
  },
  'cyber-security-and-cryptography': {
    title: 'Cyber Security & Cryptography',
    category: 'Computer Science',
    description: 'Learn encryption, hashing, and security fundamentals through interactive labs.',
  },
  'data-analytics': {
    title: 'Data Analytics',
    category: 'Computer Science',
    description: 'Analyze datasets and explore analytics workflows with structured virtual experiments.',
  },
  'data-science': {
    title: 'Data Structures & Algorithms',
    category: 'Computer Science',
    description: 'Visualize sorting, searching, graphs, trees, and classic algorithm simulations.',
  },
  'design-and-analysis-of-algorithms': {
    title: 'Design & Analysis of Algorithms',
    category: 'Computer Science',
    description: 'Step through algorithm design problems with interactive experiment modules.',
  },
}

function titleFromName(name) {
  return name
    .replace(/[-_]/g, ' ')
    .replace(/\b\w/g, (c) => c.toUpperCase())
    .replace(/\bExp\b/gi, 'Experiment')
    .replace(/\bDfs\b/gi, 'DFS')
    .replace(/\bBfs\b/gi, 'BFS')
}

function readHtmlTitle(filePath) {
  try {
    const html = fs.readFileSync(filePath, 'utf8')
    const match = html.match(/<title[^>]*>([^<]+)<\/title>/i)
    return match?.[1]?.trim() || null
  } catch {
    return null
  }
}

function walkForAimFiles(dir, base = '') {
  const results = []
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const rel = base ? `${base}/${entry.name}` : entry.name
    const full = path.join(dir, entry.name)
    if (entry.isDirectory()) {
      results.push(...walkForAimFiles(full, rel))
    } else if (entry.name === 'aim.html') {
      results.push({ name: base || path.basename(dir), entry: `${rel}` })
    }
  }
  return results
}

function getExperiments(subjectDir) {
  const full = path.join(root, subjectDir)
  const items = fs.readdirSync(full, { withFileTypes: true })
  const htmlAtRoot = items.filter((i) => i.isFile() && i.name.endsWith('.html'))

  if (htmlAtRoot.length > 0) {
    return htmlAtRoot
      .map((file) => {
        const id = file.name.replace(/\.html$/i, '')
        const filePath = path.join(full, file.name)
        return {
          id,
          title: readHtmlTitle(filePath) || titleFromName(id),
          entry: file.name,
        }
      })
      .sort((a, b) => a.id.localeCompare(b.id, undefined, { numeric: true }))
  }

  const aimFiles = walkForAimFiles(full)
  if (aimFiles.length > 0) {
    return aimFiles
      .map(({ name, entry }) => {
        const filePath = path.join(full, entry)
        const id = name.replace(/\//g, '-').replace(/\s+/g, '-').toLowerCase()
        return {
          id,
          title: readHtmlTitle(filePath) || titleFromName(name.split('/').pop()),
          entry,
        }
      })
      .sort((a, b) => a.title.localeCompare(b.title, undefined, { numeric: true }))
  }

  const subdirs = items.filter((i) => i.isDirectory())
  return subdirs
    .map((sd) => {
      const subPath = path.join(full, sd.name)
      const subFiles = fs.readdirSync(subPath)
      const entryFile = subFiles.includes('aim.html')
        ? `${sd.name}/aim.html`
        : subFiles.find((f) => f.endsWith('.html'))
          ? `${sd.name}/${subFiles.find((f) => f.endsWith('.html'))}`
          : null
      if (!entryFile) return null
      const filePath = path.join(full, entryFile)
      return {
        id: sd.name,
        title: readHtmlTitle(filePath) || titleFromName(sd.name),
        entry: entryFile,
      }
    })
    .filter(Boolean)
    .sort((a, b) => a.id.localeCompare(b.id, undefined, { numeric: true }))
}

const subjects = fs
  .readdirSync(root, { withFileTypes: true })
  .filter((d) => d.isDirectory() && !SKIP_FOLDERS.has(d.name))
  .map((d) => {
    const meta = SUBJECT_META[d.name] || {
      title: titleFromName(d.name),
      category: 'General',
      description: `Interactive 2D lab experiments for ${titleFromName(d.name)}.`,
    }
    const experiments = getExperiments(d.name)
    return {
      id: d.name,
      ...meta,
      type: '2D',
      status: 'Live',
      experimentCount: experiments.length,
      experiments,
    }
  })
  .filter((s) => s.experimentCount > 0)
  .sort((a, b) => a.title.localeCompare(b.title))

const vrLabs = [
  {
    id: 'car-simulation',
    title: 'Car Simulation',
    category: 'Engineering',
    type: 'VR',
    status: 'Live',
    description: 'Immersive VR car simulation experience. Install the APK on a compatible Android VR headset.',
    apkPath: '/labs/vr/CarSimulation.apk',
    apkSize: fs.statSync(path.resolve(__dirname, '../VR Labs/CarSimulation.apk')).size,
    learningObjectives: [
      'Experience immersive vehicle simulation in VR',
      'Practice spatial navigation in a 3D environment',
      'Apply engineering concepts through interactive scenarios',
    ],
  },
]

const catalog = { subjects, vrLabs }
fs.writeFileSync(output, `${JSON.stringify(catalog, null, 2)}\n`)
fs.rmSync(publicRoot, { recursive: true, force: true })
fs.mkdirSync(path.dirname(publicRoot), { recursive: true })
fs.cpSync(root, publicRoot, { recursive: true })
console.log(`Generated ${subjects.length} 2D subjects and ${vrLabs.length} VR lab(s) -> ${output}`)
