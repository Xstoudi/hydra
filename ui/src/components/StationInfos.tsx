import { useMemo } from 'react'
import Badge from './Badge'
import CardStat from './CardStat'
import NiceBorder from './NiceBorder'
import StationsLayer from './StationsLayer'
import SwissMap from './SwissMap'
import { DateTime } from 'luxon'
import { useTranslation } from 'react-i18next'

import { LANGUAGES } from './LangSelector'

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
    () => LANGUAGES.find(lang => lang.key === i18n.language) || LANGUAGES[0],
    [i18n.language]
  )

  return (
    <div className='space-y-8 gap-8 flex md:space-y-0 flex-col lg:flex-row lg:items-center'>
      <div className='flex-col gap-4 w-full lg:w-1/2 xl:w-1/3 h-80 flex'>
        <SwissMap centerPosition={stationPosition}>
          <StationsLayer stations={[station]} />
        </SwissMap>
        <p className='text-xl'>
          {t('last_update')}:{' '}
          {
            DateTime
              .fromISO(station.meta.last_measured_at)
              .toLocaleString(DateTime.DATETIME_MED, { locale: langKey.key })
          }
        </p>
      </div>
      <div className='flex flex-col gap-12 w-full lg:w-1/2'>
        <div className='flex flex-col'>
          <div className='flex gap-2'>
            <h2 className='text-4xl'>{station.water_body_name}</h2>
            <div>
              <Badge text={t(`water_body_type.${station.water_body_type}`)} />
            </div>
          </div>
          <h3 className='text-3xl'>{station.name}</h3>
        </div>
        <div className='grid gap-4 grid-cols-2 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2'>
          
          {
            station.meta.temperature !== null && (
              <NiceBorder>
                <CardStat emoji='🌡️' value={station.meta.temperature} unit='°C' />
              </NiceBorder>
            )
          }
          {
            station.meta.discharge !== null && (
              <NiceBorder>
                <CardStat emoji='💦' value={station.meta.discharge} unit='m&sup3;/s' />
              </NiceBorder>
            )
          }
          {
            station.meta.level !== null && (
              <NiceBorder>
                <CardStat emoji='📏' value={station.meta.level} unit='m' />
              </NiceBorder>
            )
          }
        </div>
      </div>   
    </div>
  )
}