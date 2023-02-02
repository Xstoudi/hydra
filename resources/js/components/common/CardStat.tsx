import Twemoji from '../utils/Twemoji'

interface CardStatProps {
  emoji: string
  value: number
  unit: string
}

export default function CardStat({ emoji, value, unit }: CardStatProps) {
  return (
    <div className="grid grid-cols-3">
      <Twemoji emoji={emoji} size="md" />
      <span className="w-1/2 text-2xl font-semibold text-center text-gray-900">
        {value.toFixed(1)}
      </span>
      <span className="text-2xl leading-8 text-right text-gray-900">{unit}</span>
    </div>
  )
}
