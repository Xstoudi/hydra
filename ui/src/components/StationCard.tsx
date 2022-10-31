import { memo } from 'react'
import Card from './Card'
import CardStat from './CardStat'

interface StationCardProps {
  station: StationData
}

function StationCard({ station }: StationCardProps) {
  return (
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
  )
}

export default memo(StationCard)
