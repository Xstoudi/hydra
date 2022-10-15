export default function getProgressBar(currentPercentage: number) {
  const completed = Math.round(currentPercentage / 10)
  const remaining = 10 - completed
  return `${'\u2588'.repeat(completed)}${'\u2591'.repeat(remaining)}`
}
