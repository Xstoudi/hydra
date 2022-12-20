import { DateTime } from 'luxon'
import { Dispatch, SetStateAction } from 'react'
import { useTranslation } from 'react-i18next'
import DatePicker from './DatePicker'

interface DateRangePickerProps {
  fromDate: DateTime | null
  toDate: DateTime | null
  setFromDate: Dispatch<SetStateAction<DateTime | null>>
  setToDate: Dispatch<SetStateAction<DateTime | null>>
}

export default function DateRangePicker({ fromDate, toDate, setFromDate, setToDate }: DateRangePickerProps) {

  const { t } = useTranslation('stations')

  return (
    <div className='flex items-center'>
      <DatePicker placeholder={t('date_pickers.start')} value={fromDate} onChange={setFromDate} />
      <span className='mx-4 text-gray-500'>{t('to')}</span>
      <DatePicker placeholder={t('date_pickers.end')} value={toDate} onChange={setToDate} />
    </div>
  )
}