import Twemoji from './Twemoji'

interface CardStatProps {
  emoji: string
  value: number
  unit: string
}
export default function CardStat({ emoji, value, unit }: CardStatProps) {
  return (
    <div className='grid grid-cols-3'>
      <Twemoji emoji={emoji} size='md' />
      <span className='text-gray-900 font-semibold text-2xl text-center w-1/2'>{value.toFixed(1)}</span>
      <span className='text-gray-900 text-2xl text-right leading-8'>{unit}</span>
    </div>
  )
}