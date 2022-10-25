import Twemoji from './Twemoji'

interface CardStatProps {
  emoji: string
  value: number
  unit: string
}
export default function CardStat({ emoji, value, unit }: CardStatProps) {
  return (
    <div className='flex flex-row justify-between'>
      <Twemoji emoji={emoji} />
      <span className='text-gray-900'>{value.toFixed(1)} {unit}</span>
    </div>
  )
}