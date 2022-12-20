import { Menu, Transition } from '@headlessui/react'
import { Fragment, useCallback, useMemo, useState } from 'react'
import { DayPicker } from 'react-day-picker'
import 'react-day-picker/dist/style.css'
import { useTranslation } from 'react-i18next'

import enLocale from 'date-fns/locale/en-US'
import frLocale from 'date-fns/locale/fr'
import { DateTime } from 'luxon'

interface DatePickerProps {
  placeholder: string
  value: DateTime | null
  onChange: (date: DateTime | null) => void
}

export default function DatePicker({ placeholder, value, onChange }: DatePickerProps) {

  const { i18n } = useTranslation()

  const locale = useMemo(() => {
    if (i18n.language === 'fr') {
      return frLocale
    }
    return enLocale
  }, [i18n.language])

  const dateStr = useMemo(() => value?.toLocaleString({ dateStyle: 'medium' }) ?? '', [value])
  const dateJS = useMemo(() => value?.toJSDate() ?? undefined, [value])
  const handleDateSelect = useCallback(
    (day: Date | undefined) => onChange(day ? DateTime.fromJSDate(day) : null),
    [onChange]
  )

  return (
    <Menu as='div' className='relative inline-block text-left'>
      <Menu.Button className='bg-opacity/20 hover:bg-opacity/30 focus-visible:ring-opacity/75 inline-flex w-full justify-center rounded-md text-sm font-medium text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white'>
        <div className='relative'>
          <div className='flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none'>
            <svg aria-hidden='true' className='w-5 h-5 text-gray-500' fill='currentColor' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'><path fillRule='evenodd' d='M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z' clipRule='evenodd'></path></svg>
          </div>
          <input readOnly name='date' type='text' className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5' placeholder={placeholder} value={dateStr} />
        </div>
      </Menu.Button>
      <Transition
        as={Fragment}
        enter='transition ease-out duration-100'
        enterFrom='transform opacity-0 scale-95'
        enterTo='transform opacity-100 scale-100'
        leave='transition ease-in duration-75'
        leaveFrom='transform opacity-100 scale-100'
        leaveTo='transform opacity-0 scale-95'
      >
        <Menu.Items unmount={false}  className='ring-opacity/5 z-10 absolute left-0 mt-2 origin-top-left divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black focus:outline-none'>
          <div className='p-1'>
            <Menu.Item>
              <>
                <DayPicker
                  mode='single'
                  locale={locale}
                  onSelect={handleDateSelect}
                  selected={dateJS}
                />
              </>
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  )
}