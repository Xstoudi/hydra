import { useQuery } from '@tanstack/react-query'
import sortBy from 'lodash/sortBy'
import groupBy from 'lodash/groupBy'
import { useMemo } from 'react'
import { ResponsiveContainer, LineChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Line } from 'recharts'
import { getMeasures } from '../services/measures'
import { DateTime } from 'luxon'
import Spinner from './Spinner'

interface StationChartsProps {
  stationId?: string
}

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
    domain: ['dataMin', 'dataMax']
  },
  line: {
    strokeWith: 2,
    dot: false
  }
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
      })), ['date'])
  }, [seriesData])

  if(areSeriesLoading) {
    return <Spinner />
  }

  return (
    <>
      <ResponsiveContainer width={chartsWidth} height={chartsConfig.height}>
        <LineChart data={series} syncId='charts'>
          <CartesianGrid strokeDasharray='3 3' />
          <XAxis dataKey='date' minTickGap={chartsConfig.xAxis.minTickGap} interval={chartsConfig.xAxis.interval} tickFormatter={chartsConfig.xAxis.tickFormatter} />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type='monotone' dataKey='temperature' stroke='#8884d8' strokeWidth={chartsConfig.line.strokeWith} dot={chartsConfig.line.dot} connectNulls />
        </LineChart>
      </ResponsiveContainer>
      <ResponsiveContainer width={chartsWidth} height={chartsConfig.height}>
        <LineChart data={series} syncId='charts'>
          <CartesianGrid strokeDasharray='3 3' />
          <XAxis dataKey='date' minTickGap={chartsConfig.xAxis.minTickGap} interval={chartsConfig.xAxis.interval} tickFormatter={chartsConfig.xAxis.tickFormatter} />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type='monotone' dataKey='discharge' stroke='#8884d8' strokeWidth={chartsConfig.line.strokeWith} dot={chartsConfig.line.dot} connectNulls />
        </LineChart>
      </ResponsiveContainer>
      <ResponsiveContainer width={chartsWidth} height={chartsConfig.height}>
        <LineChart data={series} syncId='charts'>
          <CartesianGrid strokeDasharray='3 3' />
          <XAxis dataKey='date' minTickGap={chartsConfig.xAxis.minTickGap} interval={chartsConfig.xAxis.interval} tickFormatter={chartsConfig.xAxis.tickFormatter} />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type='monotone' dataKey='level' stroke='#8884d8' strokeWidth={chartsConfig.line.strokeWith} dot={chartsConfig.line.dot} connectNulls />
        </LineChart>
      </ResponsiveContainer>
    </>
  )
}