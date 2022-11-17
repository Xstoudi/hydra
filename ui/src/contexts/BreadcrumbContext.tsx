import { createContext, Dispatch, SetStateAction, useState } from 'react'

interface BreadcrumbProviderProps {
  children: React.ReactNode
}

interface Breadcrumb {
  label: string
  path: string
}

interface BreadcrumbContextProps {
  breadcrumbs: Breadcrumb[]
  setBreadcrumbs: Dispatch<SetStateAction<Breadcrumb[]>>
}

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
export const BreadcrumbContext = createContext<BreadcrumbContextProps>(undefined!)
BreadcrumbContext.displayName = 'BreadcrumbContext'

export default function BreadcrumbProvider({ children }: BreadcrumbProviderProps) {
  const [breadcrumbs, setBreadcrumbs] = useState<Breadcrumb[]>([])

  return (
    <BreadcrumbContext.Provider value={{ breadcrumbs, setBreadcrumbs }}>
      {children}
    </BreadcrumbContext.Provider>
  )
}