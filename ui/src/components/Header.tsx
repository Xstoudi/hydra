import LangSelector from './LangSelector'

export default function Header() {
  return (
    <div className='bg-white mx-8 border-b-2 border-gray-100 py-4'>
      <div className='flex justify-between mx-auto w-full'>
        <h1 className='text-4xl font-semibold'>Hydra</h1>
        <div className='relative mt-1'>
          <LangSelector />
        </div>
      </div>
    </div>
  )
}