import { useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'
import StationLoadingSkeleton from '../components/StationLoadingSkeleton'
import useDebounce from '../hooks/use-debounce'
import { getStation } from '../services/stations'

export default function Station() {

  const { id } = useParams()

  const { data: stationData, isLoading: isStationLoading } = useQuery(
    ['station', id],
    () => getStation(id),
    { keepPreviousData: true }
  )

  const debouncedStationLoading = useDebounce(isStationLoading, 500)

  return (
    <div className='flex flex-col mx-auto w-5/6 gap-8 md:w-2/3 lg:w-4/5 mt-8'>
      <div className='h-screen-wo-header'>
        {debouncedStationLoading && <StationLoadingSkeleton />}
      </div>
    </div>
  )
}