export function normalizeDischarge(value: number, unit: string) {
  switch (unit) {
    case 'm3/s':
      return value
    case 'l/s':
      return value / 1000
    case 'l/min':
      return value / 1000 / 60
    default:
      throw new Error(`unknown discharge unit "${unit}"`)
  }
}
