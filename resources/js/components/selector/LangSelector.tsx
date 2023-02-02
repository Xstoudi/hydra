import { ChevronUpDownIcon, CheckIcon } from '@heroicons/react/24/outline'
import { Listbox, Transition } from '@headlessui/react'
import { Fragment, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

import Twemoji from '../utils/Twemoji'

export const LANGUAGES = [
  { id: 0, name: 'Français', key: 'fr', emoji: '🇫🇷' },
  { id: 1, name: 'English', key: 'en', emoji: '🇬🇧' },
]

export default function LangSelector() {
  const { i18n } = useTranslation()
  const [selectedLang, setSelectedLang] = useState(
    LANGUAGES.find((lang) => lang.key === i18n.language) || LANGUAGES[0]
  )

  useEffect(() => {
    i18n.changeLanguage(selectedLang.key)
  }, [selectedLang])

  return (
    <Listbox value={selectedLang} onChange={setSelectedLang}>
      <div className="relative mt-1">
        <Listbox.Button className="relative flex items-center w-full py-2 pl-3 pr-10 text-left bg-white rounded-lg shadow-md cursor-default focus-visible:ring-white/75 focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
          <Twemoji emoji={selectedLang.emoji} size="sm" />
          <span className="block ml-2 truncate">{selectedLang.name}</span>
          <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
            <ChevronUpDownIcon className="w-5 h-5 text-gray-400" aria-hidden="true" />
          </span>
        </Listbox.Button>
        <Transition
          as={Fragment}
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Listbox.Options className="absolute z-50 w-full py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black/5 focus:outline-none sm:text-sm">
            {LANGUAGES.map((lang, langIndex) => (
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
                  <div className="flex items-center">
                    <Twemoji emoji={lang.emoji} size="sm" />
                    <span
                      className={`ml-2 block truncate ${selected ? 'font-medium' : 'font-normal'}`}
                    >
                      {lang.name}
                    </span>
                    {selected ? (
                      <span className="absolute inset-y-0 right-0 flex items-center pr-2 text-blue-600">
                        <CheckIcon className="w-5 h-5" aria-hidden="true" />
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
