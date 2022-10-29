import { Link } from 'react-router-dom'
import LangSelector from './LangSelector'

export default function Header() {
  return (
    <div className='mx-8 border-b-2 border-gray-100 bg-white py-4'>
      <div className='mx-auto flex w-full justify-between'>
        <Link to='/' className='text-4xl font-semibold'>Hydra</Link>
        <div className='relative mt-1'>
          <LangSelector />
        </div>
      </div>
    </div>
  )
}
