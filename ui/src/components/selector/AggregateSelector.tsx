import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/24/outline'
import { Dispatch, Fragment, SetStateAction } from 'react'
import { useTranslation } from 'react-i18next'
import { Aggregate } from '../station/StationCharts'

interface AggregateSelectorProps {
  value: Aggregate
  setValue: Dispatch<SetStateAction<Aggregate>>
  possibleValues: readonly Aggregate[]
}

export default function AggregateSelector({ value, setValue, possibleValues }: AggregateSelectorProps) {

  const { t } = useTranslation('stations')

  return (
    <Listbox value={value} onChange={setValue}>
      <div className='relative w-56'>
        <Listbox.Button className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5'>
          <span className='text-left block truncate'>{t(`aggregate.${value}`)}</span>
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
              possibleValues.map((possibleValue) => (
                <Listbox.Option
                  key={possibleValue}
                  value={possibleValue}
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
                        {t(`aggregate.${possibleValue}`)}
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
  )
}