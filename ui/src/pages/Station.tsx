import { useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'
import StationLoadingSkeleton from '../components/StationLoadingSkeleton'
import useDebounce from '../hooks/use-debounce'
import { getStation } from '../services/stations'
import StationInfos from '../components/StationInfos'
import StationCharts from '../components/StationCharts'
import useBreadcrumb from '../hooks/use-breadcrumb'
import { useTranslation } from 'react-i18next'

export default function Station() {
  const { id } = useParams()

  const { data: stationData, isLoading: isStationLoading } = useQuery(
    ['station', id],
    () => getStation(id),
    { keepPreviousData: true }
  )

  const debouncedStationLoading = useDebounce(isStationLoading, 500)

  const { setBreadcrumbs } = useBreadcrumb()

  const { t } = useTranslation('stations')

  useEffect(() => {
    setBreadcrumbs([
      {
        label: t('stations'),
        path: '/stations',
      },
      {
        label: stationData?.name || '...',
        path: `/stations/${id}`,
      },
    ])
  }, [stationData])

  return (
    <div className='flex flex-col mx-auto w-5/6 gap-8 md:w-2/3 lg:w-3/5 mt-8'>
      <div className='min-h-screen-wo-header flex flex-col gap-8'>
        {debouncedStationLoading && <StationLoadingSkeleton />}
        {
          !debouncedStationLoading && stationData !== undefined && (
            <>
              <StationInfos station={stationData} />
              <hr />
              <StationCharts stationId={id} />
            </>
          )
        }
      </div>
    </div>
  )
}