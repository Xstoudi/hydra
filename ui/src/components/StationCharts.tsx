import { useQuery } from '@tanstack/react-query'
import sortBy from 'lodash/sortBy'
import groupBy from 'lodash/groupBy'
import { useCallback, useMemo } from 'react'
import { ResponsiveContainer, LineChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Line } from 'recharts'
import { getMeasures } from '../services/measures'
import { DateTime } from 'luxon'
import Spinner from './Spinner'
import { useTranslation } from 'react-i18next'
import { Formatter, Payload } from 'recharts/types/component/DefaultTooltipContent'

const chartsWidth = '100%'

const chartsConfig = {
  width: '100%',
  height: 400,
  xAxis: {
    minTickGap: 30,
    interval: 'preserveEnd' as const,
    tickFormatter: (x: string) => DateTime.fromISO(x).toLocaleString(DateTime.DATETIME_SHORT)
  },
  yAxis: {
    domain: ['dataMin', 'dataMax'],
    width: 100
  },
  line: {
    strokeWith: 2,
    dot: false
  }
}

interface StationChartsProps {
  stationId?: string
}

export default function StationCharts({ stationId }: StationChartsProps) {
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
        date: sameDateMeasures[0].measured_at, //DateTime.fromISO(sameDateMeasures[0].measured_at).toUnixInteger(),
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
    (value: number, name: string) => [value, t(`params.${name as 'temperature' | 'discharge' | 'level'}`)],
    [t]
  )
  const translateLegend = useCallback((value: 'temperature' | 'discharge' | 'level') => t(`params.${value}`), [t])

  if(areSeriesLoading) {
    return <Spinner />
  }

  return (
    <>
      {
        hasTemperature && (
          <ResponsiveContainer width={chartsWidth} height={chartsConfig.height}>
            <LineChart data={series} syncId='charts'>
              <CartesianGrid strokeDasharray='3 3' />
              <XAxis dataKey='date' minTickGap={chartsConfig.xAxis.minTickGap} interval={chartsConfig.xAxis.interval} tickFormatter={chartsConfig.xAxis.tickFormatter} />
              <YAxis domain={chartsConfig.yAxis.domain} unit='°C' width={chartsConfig.yAxis.width} />
              <Tooltip
                labelFormatter={chartsConfig.xAxis.tickFormatter}
                formatter={translateTooltip}
              />
              <Legend formatter={translateLegend} />
              <Line type='monotone' dataKey='temperature' stroke='#8884d8' strokeWidth={chartsConfig.line.strokeWith} dot={chartsConfig.line.dot} connectNulls />
            </LineChart>
          </ResponsiveContainer>
        )
      }
      {
        hasDischarge && (
          <ResponsiveContainer width={chartsWidth} height={chartsConfig.height}>
            <LineChart data={series} syncId='charts'>
              <CartesianGrid strokeDasharray='3 3' />
              <XAxis dataKey='date' minTickGap={chartsConfig.xAxis.minTickGap} interval={chartsConfig.xAxis.interval} tickFormatter={chartsConfig.xAxis.tickFormatter} />
              <YAxis domain={chartsConfig.yAxis.domain} unit='m&sup3;/s' width={chartsConfig.yAxis.width} />
              <Tooltip
                labelFormatter={chartsConfig.xAxis.tickFormatter}
                formatter={translateTooltip}
              />              <Legend />
              <Line type='monotone' dataKey='discharge' stroke='#8884d8' strokeWidth={chartsConfig.line.strokeWith} dot={chartsConfig.line.dot} connectNulls />
            </LineChart>
          </ResponsiveContainer>
        )
      }
      {
        hasLevel && (
          <ResponsiveContainer width={chartsWidth} height={chartsConfig.height}>
            <LineChart data={series} syncId='charts'>
              <CartesianGrid strokeDasharray='3 3' />
              <XAxis dataKey='date' minTickGap={chartsConfig.xAxis.minTickGap} interval={chartsConfig.xAxis.interval} tickFormatter={chartsConfig.xAxis.tickFormatter} />
              <YAxis domain={chartsConfig.yAxis.domain} unit='m' width={chartsConfig.yAxis.width} />
              <Tooltip
                labelFormatter={chartsConfig.xAxis.tickFormatter}
                formatter={translateTooltip}
              />              <Legend />
              <Line type='monotone' dataKey='level' stroke='#8884d8' strokeWidth={chartsConfig.line.strokeWith} dot={chartsConfig.line.dot} connectNulls />
            </LineChart>
          </ResponsiveContainer>
        )
      }
    </>
  )
}