import { ArrowPathIcon } from '@heroicons/react/24/outline'
import clsx from 'clsx'

import usePosition from '../../hooks/use-position'
import Twemoji from '../utils/Twemoji'

export default function LocateButton() {
  const { locate, requesting } = usePosition()

  return (
    <button
      className="fixed z-50 flex items-center justify-center w-12 h-12 rounded-full hover:cursor-pointer bg-sky-300 right-6 bottom-6 drop-shadow-md"
      onClick={locate}
    >
      <div className={clsx(requesting && 'animate-spin text-sky-900', 'w-8 h-8 block')}>
        {requesting ? <ArrowPathIcon /> : <Twemoji emoji="📍" size="md" />}
      </div>
    </button>
  )
}
