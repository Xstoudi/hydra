import { ArrowPathIcon } from '@heroicons/react/24/outline'

export default function Spinner() {
  return (
    <div className="flex justify-center grow">
      <ArrowPathIcon className="w-20 h-20 text-sky-400 animate-spin" />
    </div>
  )
}
