import { Duration } from 'luxon'

export default function durationHumanizer(toHumanize: Duration) {
  return toHumanize.reconfigure({ locale: 'en-US' }).shiftTo('minutes', 'seconds').toHuman({
    unitDisplay: 'narrow',
    listStyle: 'narrow',
  })
}
