interface CardProps {
  title: string
  description: string
  children: React.ReactNode
}

export default function Card({ title, description, children }: CardProps) {
  return (
    <>
      <div className="px-4 py-5 sm:px-6">
        <h3 className="!overflow-hidden text-ellipsis whitespace-nowrap text-xl font-medium leading-6 text-gray-900">
          {title}
        </h3>
        <p className="max-w-2xl mt-1 text-gray-500">{description}</p>
      </div>
      <div className="flex justify-center px-4 py-5 border-t border-gray-200 grow sm:px-6">
        {children}
      </div>
    </>
  )
}
