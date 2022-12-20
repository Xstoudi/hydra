import { ArrowPathIcon } from '@heroicons/react/24/outline'
import clsx from 'clsx'
import { memo } from 'react'
import usePosition from '../../hooks/use-position'
import Twemoji from '../utils/Twemoji'

function LocateButton() {

  const { locate, requesting } = usePosition()

  return (
    <button className='hover:cursor-pointer justify-center items-center bg-sky-300 rounded-full fixed z-50 right-6 bottom-6 w-12 h-12 flex drop-shadow-md' onClick={locate}>
      <div className={clsx(requesting && 'animate-spin text-sky-900', 'w-8 h-8 block')} >
        {
          requesting ? (
            <ArrowPathIcon />
          ) : (
            <Twemoji emoji='📍' size='md' />
          )
        }
      </div>
    </button>
  )
}

export default memo(LocateButton)