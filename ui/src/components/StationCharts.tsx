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
import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/24/outline'


const aggregatePossibilities = [
  { value: 'none', label: 'None' },
  { value: 'hour', label: 'Hourly' },
  { value:'6-hours', label: 'Six hour average' },
  { value: '12-hours', label: '12 hours average' }, 
  { value: 'day', label: 'Daily' }
] as const

interface StationChartsProps {
  station: StationData
  stationId?: string
}

type Aggregate = typeof aggregatePossibilities[number]

export default function StationCharts({ station, stationId }: StationChartsProps) {
  const [fromDate, setFromDate] = useState<DateTime | null>(DateTime.now().minus(Duration.fromObject({ week: 1 })))
  const [toDate, setToDate] = useState<DateTime | null>(DateTime.now())
  const [aggregate, setAggregate] = useState<Aggregate>(aggregatePossibilities[1])

  const { data: seriesData, isLoading: areSeriesLoading } = useQuery(
    ['station', stationId, 'measures', fromDate?.toMillis(), toDate?.toMillis(), aggregate.value],
    () => getMeasures(stationId, fromDate, toDate, aggregate.value)
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
      <div className='flex flex-col md:flex-row'>
        <DateRangePicker fromDate={fromDate} setFromDate={setFromDate} toDate={toDate} setToDate={setToDate} />
        <Listbox value={aggregate} onChange={setAggregate}>
          <div className='relative w-56'>
            <Listbox.Button className='ml-4 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5'>
              <span className='text-left block truncate'>{aggregate.label}</span>
              <span className='pointer-events-none absolute inset-y-0 right-0 flex items-center'>
                <ChevronUpDownIcon
                  className='h-5 w-5 text-gray-400'
                  aria-hidden='true'
                />
              </span>
            </Listbox.Button>
            <Transition
              as={Fragment}
              leave='transition ease-in duration-100'
              leaveFrom='opacity-100'
              leaveTo='opacity-0'
            >
              <Listbox.Options className='ml-4 absolute z-50 mt-1 max-h-60 w-56 overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm'>
                {
                  aggregatePossibilities.map((aggregatePossibility) => (
                    <Listbox.Option
                      key={aggregatePossibility.value}
                      value={aggregatePossibility}
                      className={
                        ({ active }) =>
                          `relative cursor-default select-none py-2 pl-10 pr-4 ${
                            active ? 'bg-blue-100 text-blue-900' : 'text-gray-900'
                          }`
                      }
                    >
                      {
                        ({ selected }) => (
                          <div className='flex items-center'>
                            {aggregatePossibility.label}
                            {
                              selected ? (
                                <span className='absolute inset-y-0 right-0 flex items-center pr-2 text-blue-600'>
                                  <CheckIcon className='h-5 w-5' aria-hidden='true' />
                                </span>
                              ) : null
                            }
                          </div>
                        )
                      }
                    </Listbox.Option>
                  ))
                }
              </Listbox.Options>
            </Transition>
          </div>
        </Listbox>
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