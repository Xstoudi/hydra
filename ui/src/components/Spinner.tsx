import { ArrowPathIcon } from '@heroicons/react/24/outline'

export default function Spinner() {
  return (
    <div className='flex grow justify-center'>
      <ArrowPathIcon className='h-20 w-20 text-sky-400 animate-spin' />
    </div>
  )
}