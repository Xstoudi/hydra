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
      <div className='grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mx-auto w-full md:w-1/2'>
        {
          query.data?.map((station) => (
            <StationCard key={station.id} station={station} />
          ))
        }
      </div>
    </div>
  )
}