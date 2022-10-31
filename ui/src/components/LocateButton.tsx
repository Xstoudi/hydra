import { ArrowPathIcon } from '@heroicons/react/24/outline'
import clsx from 'clsx'
import { memo, useContext } from 'react'
import usePosition from '../hooks/use-position'
import { AlertContext } from './alerts/AlertProvider'
import Twemoji from './Twemoji'

function LocateButton() {

  const { locate, requesting, position } = usePosition()
  const { alerts } = useContext(AlertContext)

  console.log(alerts)

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