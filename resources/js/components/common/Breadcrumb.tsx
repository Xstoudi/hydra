import { Link } from '@inertiajs/inertia-react'
import useBreadcrumbs from '../../hooks/use-breadcrumb'

export default function Breadcrumb() {
  const { breadcrumbs } = useBreadcrumbs()

  return (
    <div className="hidden mt-1 sm:block">
      {breadcrumbs.map((breadcrumb) => (
        <Link
          key={breadcrumb.path}
          href={breadcrumb.path}
          className="inline-block mt-1 ml-2 text-xl leading-10 text-gray-500 hover:text-gray-700"
        >
          {'>'} {breadcrumb.label}
        </Link>
      ))}
    </div>
  )
}
