import Footer from '../components/common/Footer'
import Header from '../components/common/Header'
import Wrapper from '../Wrapper'

interface MainLayoutProps {
  children: React.ReactNode
}

export default function MainLayout({ children }: MainLayoutProps) {
  return (
    <Wrapper>
      <div className="flex flex-col text-slate-900">
        <Header />
        {children}
        <Footer />
      </div>
    </Wrapper>
  )
}
