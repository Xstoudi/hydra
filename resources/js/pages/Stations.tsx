import { useEffect, useMemo, useState, lazy, Suspense } from 'react'

import StationCard from '../components/station/StationCard'
import LocateButton from '../components/map/LocateButton'
import usePosition from '../hooks/use-position'
import useBreadcrumb from '../hooks/use-breadcrumb'
import { useTranslation } from 'react-i18next'
import { usePage } from '@inertiajs/inertia-react'
import StationsPage from '../types/StationsPage'
import MainLayout from '../layout/MainLayout'
import { swissCenterPosition } from '../utils/swissCenterPosition'

const LazySwissMap = lazy(() => import('../components/map/SwissMap'))
const LazyStationsLayer = lazy(() => import('../components/map/StationsLayer'))

function Stations() {
  const { position } = usePosition()

  const {
    props: { stations: stationsData },
  } = usePage<StationsPage>()

  const { setBreadcrumbs } = useBreadcrumb()

  const { t } = useTranslation('stations')

  useEffect(() => {
    setBreadcrumbs([
      {
        label: t('stations'),
        path: '/stations',
      },
    ])
  }, [])

  const [bounds, setBounds] = useState<L.LatLngBounds | null>(null)

  const stations = useMemo(
    () =>
      stationsData?.filter(
        (station) =>
          Object.keys(station.meta).find((metaKey) => station.meta[metaKey] !== null) !== undefined
      ) || [],
    [stationsData]
  )

  const shownStations = useMemo(
    () =>
      stations.filter(
        (stations) =>
          bounds === null ||
          bounds.contains([stations.coordinates.latitude, stations.coordinates.longitude])
      ) || [],
    [stations, bounds]
  )

  const wantedPosition: [number, number] = useMemo(
    () => (position === null ? swissCenterPosition : [position.latitude, position.longitude]),
    [position]
  )

  return (
    <div className="flex flex-col">
      <Suspense fallback={<div className="h-[90vh]"></div>}>
        <LazySwissMap>
          <Suspense fallback={<></>}>
            <LazyStationsLayer
              stations={stations}
              updateBounds={setBounds}
              wantedPosition={wantedPosition}
            />
          </Suspense>
        </LazySwissMap>
      </Suspense>
      <div className="grid w-5/6 grid-cols-1 gap-8 mx-auto mt-8 sm:grid-cols-2 md:w-2/3 lg:w-4/5 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-5">
        {shownStations.map((station) => (
          <StationCard key={station.id} station={station} />
        ))}
      </div>
      <LocateButton />
    </div>
  )
}

Stations.layout = (page) => <MainLayout>{page}</MainLayout>

export default Stations
