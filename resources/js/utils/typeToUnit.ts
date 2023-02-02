export default function (type: string) {
  switch (type) {
    case 'level':
      return 'm'
    case 'temperature':
      return '°C'
    case 'discharge':
      return 'm³/s'
    default:
      throw new Error(`Invalid type "${type}"`)
  }
}
