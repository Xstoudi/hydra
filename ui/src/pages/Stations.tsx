import { useQuery } from '@tanstack/react-query'
import { useMemo, useState } from 'react'
import SwissMap, { centerPosition } from '../components/SwissMap'
import StationCard from '../components/StationCard'
import { getStations } from '../services/stations'
import StationsLayer from '../components/StationsLayer'
import LocateButton from '../components/LocateButton'
import usePosition from '../hooks/use-position'
import Spinner from '../components/Spinner'

export default function Stations() {
  const { position } = usePosition()
  const { data: stationsData, isLoading: areStationsLoading, isError } = useQuery(['stations', position?.latitude, position?.longitude], () => getStations(position), { keepPreviousData: true })

  const [bounds, setBounds] = useState<L.LatLngBounds | null>(null)

  const stations = useMemo(
    () => stationsData
      ?.filter(station => 
        Object.keys(station.meta).find(metaKey => station.meta[metaKey] !== null) !== undefined
      )
      || [],
    [stationsData]
  )

  const shownStations = useMemo(
    () => stations
      .filter(stations => 
        bounds === null 
        || bounds.contains([stations.coordinates.latitude, stations.coordinates.longitude])
      )
      || [],
    [stations, bounds]
  )

  return (
    <div className='gap-8 flex flex-col'>
      <SwissMap>
        <StationsLayer
          stations={stations}
          updateBounds={setBounds}
          wantedPosition={position === null ? centerPosition : [position.latitude, position.longitude]}
        />
      </SwissMap>
      {
        areStationsLoading && (
          <Spinner />
        )
      }
      <div className='mx-auto grid w-5/6 grid-cols-1 gap-8 sm:grid-cols-2 md:w-2/3 lg:w-4/5 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-5'>
        {
          shownStations.map(station => (
            <StationCard key={station.id} station={station} />
          ))
        }
      </div>
      <LocateButton />
    </div>
  )
}
