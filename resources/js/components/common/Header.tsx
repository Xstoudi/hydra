import Breadcrumb from './Breadcrumb'
import LangSelector from '../selector/LangSelector'
import { Link } from '@inertiajs/inertia-react'

import logo from '../../../image/hydra.svg'

export default function Header() {
  return (
    <div className="py-4 mx-8 bg-white border-b-2 border-gray-100">
      <div className="flex justify-between w-full mx-auto">
        <div className="flex">
          <Link href="/">
            <img src={logo} alt="Hydra logo" className="w-12 h-12 mr-2" />
          </Link>
          <Link href="/" className="mt-1 text-4xl font-semibold">
            Hydra
          </Link>
          <Breadcrumb />
        </div>
        <div className="relative">
          <LangSelector />
        </div>
      </div>
    </div>
  )
}
