import Card from './Card'
import Twemoji from './Twemoji'

interface StationCardProps {
  station: StationData
}

export default function StationCard({ station }: StationCardProps) {
  return (
    <Card title={station.name} description={station.water_body_name}>
      <div className='flex flex-col'>
        {
          station.meta.temperature !== null && (
            <div className='flex flex-row justify-between'>
              <Twemoji emoji='🌡️' />
              <span className='text-gray-900'>{station.meta.temperature} °C</span>
            </div>
          )
        }
        {
          station.meta.discharge !== null && (
            <div className='flex flex-row justify-between'>
              <Twemoji emoji='💦' />
              <span className='text-gray-900'>{station.meta.discharge} m3/s</span>
            </div>
          )
        }
      </div>
    </Card>
  )
}