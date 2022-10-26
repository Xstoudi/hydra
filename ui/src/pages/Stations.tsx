import { useQuery } from '@tanstack/react-query'
import Card from '../components/Card'
import Map from '../components/Map'
import StationCard from '../components/StationCard'
import { getStations } from '../services/stations'

export default function Stations() {
  const query = useQuery(['stations'], getStations)

  return (
    <div className='flex flex-col gap-8'>
      <Map />
      <div className='grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-5 mx-auto w-5/6 md:w-2/3 lg:w-4/5'>
        {
          query.data?.filter(station => Object.keys(station.meta).length > 0).map((station) => (
            <StationCard key={station.id} station={station} />
          ))
        }
      </div>
    </div>
  )
}