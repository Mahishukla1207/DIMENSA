import catalog from '../data/labs.json'

export const { subjects, vrLabs } = catalog

export function getAllLabs() {
  const twoD = subjects.map((subject) => ({
    ...subject,
    kind: 'subject',
  }))
  const vr = vrLabs.map((lab) => ({
    ...lab,
    kind: 'vr',
    experimentCount: 1,
  }))
  return [...twoD, ...vr]
}

export function getSubject(id) {
  return subjects.find((subject) => subject.id === id)
}

export function getVRLab(id) {
  return vrLabs.find((lab) => lab.id === id)
}

export function getExperiment(subjectId, experimentId) {
  const subject = getSubject(subjectId)
  if (!subject) return null
  const experiment = subject.experiments.find((item) => item.id === experimentId)
  if (!experiment) return null
  return { subject, experiment }
}

export function getLabAssetPath(subjectId, entry) {
  return `/labs/2d/${subjectId}/${entry.split('/').map(encodeURIComponent).join('/')}`
}

export function formatBytes(bytes) {
  if (!bytes) return 'Unknown size'
  const units = ['B', 'KB', 'MB', 'GB']
  let size = bytes
  let unit = 0
  while (size >= 1024 && unit < units.length - 1) {
    size /= 1024
    unit += 1
  }
  return `${size.toFixed(unit === 0 ? 0 : 1)} ${units[unit]}`
}
