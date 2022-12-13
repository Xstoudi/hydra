import { DateTime } from 'luxon'
import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { CartesianGrid, Legend, Line, LineChart, ReferenceLine, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
// eslint-disable-next-line import/no-unresolved
import { Formatter } from 'recharts/types/component/DefaultTooltipContent'

interface StationChartProps {
  station: StationData
  series: Serie[]
  translateTooltip: Formatter<number, string>
  translateLegend: (value: MeasureType) => string
  measureType: MeasureType
  unit: string
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
    domain: ['dataMin', 'dataMax'],
    width: 100
  },
  line: {
    strokeWith: 2,
    dot: false
  }
}

export default function StationChart({
  station,
  series,
  translateTooltip,
  translateLegend,
  measureType,
  unit
}: StationChartProps) {

  const { t } = useTranslation('stations')

  const dlColorMap = useMemo(() => [
    {
      value: station.meta.dl2,
      color: '#ffff7f'
    },
    {
      value: station.meta.dl3,
      color: '#ffcc7f'
    },
    {
      value: station.meta.dl4,
      color: '#ff7f7f'
    },
    {
      value: station.meta.dl5,
      color: '#bf7f7f'
    }
  ], [station])

  return (
    <ResponsiveContainer width={chartsWidth} height={chartsConfig.height}>
      <LineChart data={series} syncId='charts'>
        <CartesianGrid strokeDasharray='3 3' />
        <XAxis dataKey='date' minTickGap={chartsConfig.xAxis.minTickGap} interval={chartsConfig.xAxis.interval} tickFormatter={chartsConfig.xAxis.tickFormatter} />
        <YAxis domain={chartsConfig.yAxis.domain} unit={unit} width={chartsConfig.yAxis.width} />
        <Tooltip
          labelFormatter={chartsConfig.xAxis.tickFormatter}
          formatter={translateTooltip}
        />
        <Legend formatter={translateLegend} />
        <Line type='monotone' dataKey={measureType} stroke='#8884d8' strokeWidth={chartsConfig.line.strokeWith} dot={chartsConfig.line.dot} connectNulls />
        {
          station.meta.dl_measure_type === measureType && (
            <>
              {
                dlColorMap.map(({ value, color }, i) => (
                  <ReferenceLine key={value} y={value as number} stroke={color} label={`${t('dl')}${i + 1}`} />
                ))
              }
            </>
          )
        }
      </LineChart>
    </ResponsiveContainer>
  )
}