import { useQuery } from '@tanstack/react-query'
import { useMemo, useState } from 'react'
import SwissMap from '../components/SwissMap'
import StationCard from '../components/StationCard'
import { getStations } from '../services/stations'
import StationsLayer from '../components/StationsLayer'
import LocateButton from '../components/LocateButton'

export default function Stations() {
  const query = useQuery(['stations'], getStations)

  const [bounds, setBounds] = useState<L.LatLngBounds | null>(null)

  const stations = useMemo(
    () => query.data
      ?.filter(station => 
        Object.keys(station.meta).find(metaKey => station.meta[metaKey] !== null) !== undefined
      )
      .filter(stations => 
        bounds === null 
        || bounds.contains([stations.coordinates.latitude, stations.coordinates.longitude])
      )
      || [],
    [query.data, bounds]
  )

  return (
    <div className='gap-8 flex flex-col '>
      <SwissMap>
        <StationsLayer stations={stations} updateBounds={setBounds} />
      </SwissMap>
      <div className='mx-auto grid w-5/6 grid-cols-1 gap-8 sm:grid-cols-2 md:w-2/3 lg:w-4/5 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-5'>
        {
          stations?.map(station => (
            <StationCard key={station.id} station={station} />
          ))
        }
      </div>
      <LocateButton />
    </div>
  )
}
