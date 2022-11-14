import clsx from 'clsx'

interface NiceBorderProps {
  className?: string
  children: React.ReactNode
}

export default function NiceBorder({ children, className }: NiceBorderProps) {
  return (
    <div className={clsx(className, 'group relative inline-flex items-center justify-center p-0.5 overflow-hidden text-sm font-medium text-gray-900 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-500')}>
      <span className='w-full relative px-5 py-2.5 transition-all ease-in duration-75 bg-white rounded-md'>
        {children}
      </span>
    </div>
  )
}