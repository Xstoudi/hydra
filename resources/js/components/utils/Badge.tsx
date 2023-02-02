interface BadgeProps {
  text: string
}

export default function Badge({ text }: BadgeProps) {
  return (
    <span className="inline align-middle bg-blue-100 text-blue-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800">
      {text}
    </span>
  )
}
