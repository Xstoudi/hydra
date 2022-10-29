import Header from '../components/Header'

interface MainLayoutProps {
  children: React.ReactNode
}

export default function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className='flex flex-col text-slate-900'>
      <Header />
      {children}
    </div>
  )
}
