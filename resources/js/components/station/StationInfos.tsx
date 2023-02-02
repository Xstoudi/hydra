import { useMemo, lazy, Suspense } from 'react'
import { DateTime } from 'luxon'
import range from 'lodash/range'
import clsx from 'clsx'
import Badge from '../utils/Badge'
import CardStat from '../common/CardStat'
import NiceBorder from '../utils/NiceBorder'
import { useTranslation } from 'react-i18next'

import { LANGUAGES } from '../selector/LangSelector'
import typeToUnit from '../../utils/typeToUnit'

const LazySwissMap = lazy(() => import('../map/SwissMap'))
const LazyStationsLayer = lazy(() => import('../map/StationsLayer'))

interface StationInfosProps {
  station: StationData
}

export default function StationInfos({ station }: StationInfosProps) {
  const stationPosition: [number, number] = useMemo(
    () => [station?.coordinates.latitude, station?.coordinates.longitude],
    [station]
  )

  const { i18n, t } = useTranslation('stations')

  const langKey = useMemo(
    () => LANGUAGES.find((lang) => lang.key === i18n.language) || LANGUAGES[0],
    [i18n.language]
  )

  return (
    <div className="flex flex-col justify-between gap-8 space-y-8 md:space-y-0 lg:flex-row lg:items-center">
      <div className="flex flex-col w-full gap-4 lg:w-1/2 xl:w-1/3 h-80">
        <Suspense fallback={<></>}>
          <LazySwissMap centerPosition={stationPosition}>
            <Suspense fallback={<></>}>
              <LazyStationsLayer stations={[station]} />
            </Suspense>
          </LazySwissMap>
        </Suspense>
        <p className="text-xl">
          {t('last_update')}:{' '}
          {DateTime.fromISO(station.meta.last_measured_at).toLocaleString(DateTime.DATETIME_MED, {
            locale: langKey.key,
          })}
        </p>
      </div>
      <div className="flex flex-col w-full gap-8 lg:w-3/5">
        <div className="flex flex-col">
          <div className="flex gap-2">
            <h2 className="text-4xl">{station.water_body_name}</h2>
            <div>
              <Badge text={t(`water_body_type.${station.water_body_type}`)} />
            </div>
          </div>
          <h3 className="text-3xl">{station.name}</h3>
        </div>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
          {station.meta.temperature !== null && (
            <NiceBorder>
              <CardStat emoji="🌡️" value={station.meta.temperature} unit="°C" />
            </NiceBorder>
          )}
          {station.meta.discharge !== null && (
            <NiceBorder>
              <CardStat emoji="💦" value={station.meta.discharge} unit="m&sup3;/s" />
            </NiceBorder>
          )}
          {station.meta.level !== null && (
            <NiceBorder>
              <CardStat emoji="📏" value={station.meta.level} unit="m" />
            </NiceBorder>
          )}
        </div>
        {station.meta.dl_measure_type !== null && (
          <div className="flex flex-col gap-4">
            <h4 className="text-2xl">{t('danger_levels')}</h4>
            <table className="w-full text-lg table-fixed">
              <thead>
                <tr>
                  <th className="px-2 py-3 border-2">{t('danger_levels')}</th>
                  {range(1, 6).map((i) => (
                    <th
                      className={clsx(
                        'text-center border-2 px-2 py-3',
                        { 'bg-[#ffff7f]': i === 2 },
                        { 'bg-[#ffcc7f]': i === 3 },
                        { 'bg-[#ff7f7f]': i === 4 },
                        { 'bg-[#bf7f7f]': i === 5 }
                      )}
                      key={i}
                    >
                      {t('dl')}
                      {i}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th className="px-2 py-3 text-center border-2">
                    {t(`params.${station.meta.dl_measure_type}`)} [
                    {typeToUnit(station.meta.dl_measure_type)}]
                  </th>
                  <td className="px-2 py-3 text-center border-2">{`< ${station.meta.dl2}`}</td>
                  <td className="px-2 py-3 text-center border-2">{`${station.meta.dl2} - ${station.meta.dl3}`}</td>
                  <td className="px-2 py-3 text-center border-2">{`${station.meta.dl3} - ${station.meta.dl4}`}</td>
                  <td className="px-2 py-3 text-center border-2">{`${station.meta.dl4} - ${station.meta.dl5}`}</td>
                  <td className="px-2 py-3 text-center border-2">{`> ${station.meta.dl5}`}</td>
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}
