import LangSelector from '../components/LangSelector'

interface MainLayoutProps {
  children: React.ReactNode
}

export default function MainLayout({ children }: MainLayoutProps) {

  return (
    <div className='flex flex-col text-slate-900'>
      <div className='bg-white mx-8 border-b-2 border-gray-100 py-4'>
        <div className='flex justify-between mx-auto w-full xl:w-2/3 2xl:w-1/2'>
          <h1 className='text-4xl font-semibold'>Hydra</h1>
          <div className='relative mt-1'>
            <LangSelector />
          </div>
        </div>
      </div>
      {children}
    </div>
  )
}