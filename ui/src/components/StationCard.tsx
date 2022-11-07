import { memo } from 'react'
import { Link } from 'react-router-dom'
import Card from './Card'
import CardStat from './CardStat'

interface StationCardProps {
  station: StationData
}

function StationCard({ station }: StationCardProps) {
  return (
    <Link to={`/stations/${station.id}`} className='flex flex-col overflow-hidden bg-white shadow sm:rounded-lg'>
      <Card title={station.name} description={station.water_body_name}>
        <div className='flex flex-col grow justify-center gap-4'>
          {
            station.meta.temperature !== null && (
              <CardStat emoji='🌡️' value={station.meta.temperature} unit='°C' />
            )
          }
          {
            station.meta.discharge !== null && (
              <CardStat emoji='💦' value={station.meta.discharge} unit='m&sup3;/s' />
            )
          }
          {station.meta.level !== null && <CardStat emoji='📏' value={station.meta.level} unit='m' />}
        </div>
      </Card>
    </Link>
  )
}

export default memo(StationCard)
