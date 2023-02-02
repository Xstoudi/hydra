import { useEffect } from 'react'
import StationInfos from '../components/station/StationInfos'
import useBreadcrumb from '../hooks/use-breadcrumb'
import { useTranslation } from 'react-i18next'
import StationPage from '../types/StationPage'
import { usePage } from '@inertiajs/inertia-react'

export default function Station() {
  const {
    props: { station: stationData },
  } = usePage<StationPage>()

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
        path: `/stations/${stationData.id}`,
      },
    ])
  }, [stationData])

  return (
    <div className="flex flex-col w-5/6 gap-8 mx-auto mt-8 md:w-2/3 lg:w-3/5">
      <div className="flex flex-col gap-8 min-h-screen-wo-header">
        <StationInfos station={stationData} />
        <hr />
        {`<StationCharts station={stationData} stationId={id} />`}
      </div>
    </div>
  )
}
