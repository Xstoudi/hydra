import { useEffect } from 'react'
import { usePage } from '@inertiajs/inertia-react'
import { useTranslation } from 'react-i18next'
import BreadcrumbProvider from './contexts/BreadcrumbContext'
import PositionProvider from './contexts/PositionContext'
import CommonPage from './types/CommonPage'

import './utils/i18n'

interface WrapperProps {
  children: React.ReactNode
}

export default function Wrapper({ children }: WrapperProps) {
  const { props } = usePage<CommonPage>()
  const { i18n } = useTranslation()

  useEffect(() => {
    props.locale && i18n.changeLanguage(props.locale)
  }, [props.locale, i18n])

  return (
    <PositionProvider>
      <p>HELLO</p>
      <BreadcrumbProvider>{children}</BreadcrumbProvider>
    </PositionProvider>
  )
}
