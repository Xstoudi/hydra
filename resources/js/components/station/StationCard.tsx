import { Link } from '@inertiajs/inertia-react'
import Card from '../common/Card'
import CardStat from '../common/CardStat'

interface StationCardProps {
  station: StationData
}

export default function StationCard({ station }: StationCardProps) {
  return (
    <Link
      href={`/stations/${station.id}`}
      className="flex flex-col overflow-hidden bg-white shadow sm:rounded-lg"
    >
      <Card title={station.name} description={station.water_body_name}>
        <div className="flex flex-col justify-center gap-4 grow">
          {station.meta.temperature !== null && (
            <CardStat emoji="🌡️" value={station.meta.temperature} unit="°C" />
          )}
          {station.meta.discharge !== null && (
            <CardStat emoji="💦" value={station.meta.discharge} unit="m&sup3;/s" />
          )}
          {station.meta.level !== null && (
            <CardStat emoji="📏" value={station.meta.level} unit="m" />
          )}
        </div>
      </Card>
    </Link>
  )
}
