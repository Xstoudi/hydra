import { useQuery } from '@tanstack/react-query'
import { useMemo } from 'react'
import Map from '../components/Map'
import StationCard from '../components/StationCard'
import { getStations } from '../services/stations'

export default function Stations() {
  const query = useQuery(['stations'], getStations)

  const stations = useMemo(
    () => query.data
      ?.filter(station => 
        Object.keys(station.meta).find(metaKey => station.meta[metaKey] !== null) !== undefined
      ) || [],
    [query.data]
  )

  return (
    <div className='gap-8 flex flex-col '>
      <Map stations={stations} />
      <div className='mx-auto grid w-5/6 grid-cols-1 gap-8 sm:grid-cols-2 md:w-2/3 lg:w-4/5 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-5'>
        {
          stations?.map(station => (
            <StationCard key={station.id} station={station} />
          ))
        }
      </div>
    </div>
  )
}
