import { memo } from 'react'
import { Link } from 'react-router-dom'
import Breadcrumb from './Breadcrumb'
import LangSelector from '../selector/LangSelector'

function Header() {
  return (
    <div className='mx-8 border-b-2 border-gray-100 bg-white py-4'>
      <div className='mx-auto flex w-full justify-between'>
        <div className='flex'>
          <Link to='/' className='text-4xl font-semibold'>Hydra</Link>
          <Breadcrumb />
        </div>
        <div className='relative'>
          <LangSelector />
        </div>
      </div>
    </div>
  )
}

export default memo(Header)