import { useQuery } from '@tanstack/react-query'
import sortBy from 'lodash/sortBy'
import groupBy from 'lodash/groupBy'
import { useCallback, useMemo } from 'react'
import { getMeasures } from '../services/measures'
import Spinner from './Spinner'
import { useTranslation } from 'react-i18next'
// eslint-disable-next-line import/no-unresolved
import { Formatter } from 'recharts/types/component/DefaultTooltipContent'
import StationChart from './StationChart'


interface StationChartsProps {
  station: StationData
  stationId?: string
}

export default function StationCharts({ station, stationId }: StationChartsProps) {
  const { data: seriesData, isLoading: areSeriesLoading } = useQuery(
    ['station', stationId, 'measures'],
    () => getMeasures(stationId),
    { keepPreviousData: true }
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
    (value: number, name: string) => [value, t(`params.${name as MeasureType}`)],
    [t]
  )
  const translateLegend = useCallback((value: MeasureType) => t(`params.${value}`), [t])

  if(areSeriesLoading) {
    return <Spinner />
  }

  return (
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
  )
}