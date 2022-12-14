import { useQuery } from '@tanstack/react-query'
import { useEffect, useMemo, useState } from 'react'
import SwissMap, { swissCenterPosition } from '../components/map/SwissMap'
import StationCard from '../components/station/StationCard'
import { getStations } from '../services/stations'
import StationsLayer from '../components/map/StationsLayer'
import LocateButton from '../components/map/LocateButton'
import usePosition from '../hooks/use-position'
import Spinner from '../components/utils/Spinner'
import useBreadcrumb from '../hooks/use-breadcrumb'
import { useTranslation } from 'react-i18next'

export default function Stations() {
  const { position } = usePosition()
  const { data: stationsData, isLoading: areStationsLoading } = useQuery(
    ['stations', position?.latitude, position?.longitude],
    () => getStations(position),
    { keepPreviousData: true }
  )

  const { setBreadcrumbs } = useBreadcrumb()

  const { t } = useTranslation('stations')

  useEffect(() => {
    setBreadcrumbs([
      {
        label: t('stations'),
        path: '/stations',
      }
    ])
  }, [])

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

  const wantedPosition: [number, number] = useMemo(
    () => position === null ? swissCenterPosition : [position.latitude, position.longitude],
    [position]
  )

  return (
    <div className='flex flex-col'>
      <SwissMap>
        <StationsLayer
          stations={stations}
          updateBounds={setBounds}
          wantedPosition={wantedPosition}
        />
      </SwissMap>
      {
        areStationsLoading && (
          <Spinner />
        )
      }
      <div className='mt-8 mx-auto grid w-5/6 grid-cols-1 gap-8 sm:grid-cols-2 md:w-2/3 lg:w-4/5 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-5'>
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
