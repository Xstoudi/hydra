import { useContext } from 'react'
import { BreadcrumbContext } from '../contexts/BreadcrumbContext'

export default function useBreadcrumb() {
  return useContext(BreadcrumbContext)
}