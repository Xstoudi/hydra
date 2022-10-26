import { useQuery } from '@tanstack/react-query'
import Map from '../components/Map'
import StationCard from '../components/StationCard'
import { getStations } from '../services/stations'

export default function Stations() {
  const query = useQuery(['stations'], getStations)

  return (
    <div className='gap-8 flex flex-col '>
      <Map />
      <div className='mx-auto grid w-5/6 grid-cols-1 gap-8 sm:grid-cols-2 md:w-2/3 lg:w-4/5 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-5'>
        {
          query.data
            ?.filter(station => Object.keys(station.meta).length > 0)
            .map(station => (
              <StationCard key={ station.id } station={ station } />
            ))
        }
      </div>
    </div>
  )
}
