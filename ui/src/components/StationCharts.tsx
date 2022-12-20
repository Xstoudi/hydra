import { useQuery } from '@tanstack/react-query'
import sortBy from 'lodash/sortBy'
import groupBy from 'lodash/groupBy'
import { Fragment, useCallback, useMemo, useState } from 'react'
import { getMeasures } from '../services/measures'
import Spinner from './Spinner'
import { useTranslation } from 'react-i18next'
// eslint-disable-next-line import/no-unresolved
import { Formatter } from 'recharts/types/component/DefaultTooltipContent'
import StationChart from './StationChart'
import { DateTime, Duration } from 'luxon'
import DateRangePicker from './DateRangePicker'
import AggregateSelector from './AggregateSelector'

const aggregatePossibilities = [
  'none',
  'hour',
  '6-hours',
  '12-hours',
  'day'
] as const

export type Aggregate = typeof aggregatePossibilities[number]

interface StationChartsProps {
  station: StationData
  stationId?: string
}

export default function StationCharts({ station, stationId }: StationChartsProps) {
  const [fromDate, setFromDate] = useState<DateTime | null>(DateTime.now().minus(Duration.fromObject({ week: 1 })))
  const [toDate, setToDate] = useState<DateTime | null>(DateTime.now())
  const [aggregate, setAggregate] = useState<Aggregate>(aggregatePossibilities[1])

  const { data: seriesData, isLoading: areSeriesLoading } = useQuery(
    ['station', stationId, 'measures', fromDate?.toMillis(), toDate?.toMillis(), aggregate],
    () => getMeasures(stationId, fromDate, toDate, aggregate)
  )

  const series = useMemo(() => {
    if(seriesData === undefined || seriesData === null) {
      return []
    }
    
    const groupedByDate = groupBy(seriesData, s => s.measured_at)
    const dates = Object.keys(groupedByDate)
    return sortBy(dates
      .map(date => groupedByDate[date])
      .map(sameDateMeasures => ({
        date: sameDateMeasures[0].measured_at,
        ...Object.fromEntries(sameDateMeasures.map(m => [m.type, m.value]))
      })), ['date']) as Serie[]
  }, [seriesData])

  const { hasTemperature, hasDischarge, hasLevel } = useMemo(() => {
    const hasTemperature = series.some(s => s.temperature !== undefined)
    const hasDischarge = series.some(s => s.discharge !== undefined)
    const hasLevel = series.some(s => s.level !== undefined)

    return { hasTemperature, hasDischarge, hasLevel }
  }, [series])

  const { t } = useTranslation('stations')

  const translateTooltip: Formatter<number, string> = useCallback(
    (value: number, name: string) => [parseFloat(value.toFixed(3)), t(`params.${name as MeasureType}`)],
    [t]
  )
  const translateLegend = useCallback((value: MeasureType) => t(`params.${value}`), [t])

  if (areSeriesLoading) {
    return <Spinner />
  }

  return (
    <>
      <div className='flex flex-col md:flex-row gap-4'>
        <DateRangePicker fromDate={fromDate} setFromDate={setFromDate} toDate={toDate} setToDate={setToDate} />
        <AggregateSelector value={aggregate} setValue={setAggregate} possibleValues={aggregatePossibilities} />
      </div>
      <>
        {
          hasTemperature && (
            <StationChart
              station={station}
              series={series}
              translateTooltip={translateTooltip}
              translateLegend={translateLegend}
              measureType='temperature'
              unit='°C'
            />
          )
        }
        {
          hasDischarge && (
            <StationChart
              station={station}
              series={series}
              translateTooltip={translateTooltip}
              translateLegend={translateLegend}
              measureType='discharge'
              unit='m&sup3;/s'
            />
          )
        }
        {
          hasLevel && (
            <StationChart
              station={station}
              series={series}
              translateTooltip={translateTooltip}
              translateLegend={translateLegend}
              measureType='level'
              unit='m'
            />
          )
        }
      </>
    </>
  )
}