import { useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'
import StationLoadingSkeleton from '../components/StationLoadingSkeleton'
import useDebounce from '../hooks/use-debounce'
import { getStation } from '../services/stations'
import StationInfos from '../components/StationInfos'
import { ResponsiveContainer, LineChart, CartesianGrid } from 'recharts'

export default function Station() {

  const { id } = useParams()

  const { data: stationData, isLoading: isStationLoading } = useQuery(
    ['station', id],
    () => getStation(id),
    { keepPreviousData: true }
  )

  const debouncedStationLoading = useDebounce(isStationLoading, 500)

  return (
    <div className='flex flex-col mx-auto w-5/6 gap-8 md:w-2/3 lg:w-3/5 mt-8'>
      <div className='min-h-screen-wo-header flex flex-col gap-8'>
        {debouncedStationLoading && <StationLoadingSkeleton />}
        {
          !debouncedStationLoading && stationData !== undefined && (
            <>
              <StationInfos station={stationData} />
              <hr />
              <ResponsiveContainer width='95%' height={400}>
                <LineChart>
                  <CartesianGrid strokeDasharray='3 3' />

                </LineChart>
              </ResponsiveContainer>
            </>
          )
        }
      </div>
    </div>
  )
}