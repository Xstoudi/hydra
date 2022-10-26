interface CardProps {
  title: string
  description: string
  children: React.ReactNode
}
export default function Card({ title, description, children }: CardProps) {
  return (
    <div className='flex flex-col overflow-hidden bg-white shadow sm:rounded-lg'>
      <div className='px-4 py-5 sm:px-6'>
        <h3 className='!overflow-hidden text-ellipsis whitespace-nowrap text-xl font-medium leading-6 text-gray-900'>
          {
            title
          }
        </h3>
        <p className='mt-1 max-w-2xl text-gray-500'>{
          description
        }</p>
      </div>
      <div className='flex grow justify-center border-t border-gray-200 px-4 py-5 sm:px-6'>{
        children
      }</div>
    </div>
  )
}
