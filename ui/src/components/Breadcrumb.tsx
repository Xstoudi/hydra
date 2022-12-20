import { Link } from 'react-router-dom'
import useBreadcrumbs from '../hooks/use-breadcrumb'

export default function Breadcrumb() {
  const { breadcrumbs } = useBreadcrumbs()
  
  return <div className='hidden sm:block'>
    {
      breadcrumbs.map(breadcrumb => (
    
        <Link key={breadcrumb.path} to={breadcrumb.path} className='text-gray-500 hover:text-gray-700 text-xl leading-10 ml-2 mt-1 inline-block'>
          {'>'} {breadcrumb.label}
        </Link>
    
      ))
    }
  </div>
}