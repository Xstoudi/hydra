import { memo } from 'react'
import Footer from '../components/Footer'
import Header from '../components/Header'

interface MainLayoutProps {
  children: React.ReactNode
}

function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className='flex flex-col gap-4 text-slate-900'>
      <Header />
      {children}
      <Footer />
    </div>
  )
}

export default memo(MainLayout)