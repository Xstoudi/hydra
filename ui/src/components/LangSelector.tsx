import Twemoji from '../components/Twemoji'
import { ChevronUpDownIcon, CheckIcon } from '@heroicons/react/24/outline'
import { Listbox, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'

const langs = [
  { id: 0, name: 'Français', emoji: '🇫🇷' },
  { id: 1, name: 'English', emoji: '🇬🇧' },
]


export default function LangSelector() {
  const [selectedLang, setSelectedLang] = useState(langs[0])

  return (
    <Listbox value={selectedLang} onChange={setSelectedLang}>
          <div className='relative mt-1'>
            <Listbox.Button className='relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm flex items-center'>
              <Twemoji emoji={selectedLang.emoji} />
              <span className='ml-2 block truncate'>{selectedLang.name}</span>
              <span className='pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2'>
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
              <Listbox.Options className='absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm'>
                {langs.map((lang, langIndex) => (
                  <Listbox.Option
                    key={langIndex}
                    className={({ active }) =>
                      `relative cursor-default select-none py-2 pl-3 pr-4 ${
                        active ? 'bg-blue-100 text-blue-900' : 'text-gray-900'
                      }`
                    }
                    value={lang}
                  >
                    {({ selected }) => (
                      <div className=' flex items-center'>
                        <Twemoji emoji={lang.emoji} />
                        <span
                          className={`ml-2 block truncate ${
                            selected ? 'font-medium' : 'font-normal'
                          }`}
                        >
                          {lang.name}
                        </span>
                        {selected ? (
                          <span className='absolute inset-y-0 right-0 flex items-center pr-2 text-blue-600'>
                            <CheckIcon className='h-5 w-5' aria-hidden='true' />
                          </span>
                        ) : null}
                      </div>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </Listbox>
  )
}