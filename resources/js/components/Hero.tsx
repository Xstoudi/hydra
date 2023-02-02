import { Link } from '@inertiajs/inertia-react'
import { useTranslation } from 'react-i18next'
import logo from '../../image/hydra.svg'
import LangSelector from './selector/LangSelector'

export default function Hero() {
  const { t } = useTranslation('home')

  return (
    <header className="bg-center bg-cover bg-hero-background">
      <div className="w-full h-screen backdrop-blur-sm">
        <div className="absolute inset-x-0 w-40 mx-auto top-12 md:right-12 md:mr-0">
          <LangSelector />
        </div>
        <div className="flex flex-col items-center justify-center w-full h-full gap-4 text-white">
          <img src={logo} alt="Hydra logo" className="h-60 w-60" />
          <h1 className="text-6xl">Hydra</h1>
          <p className="text-2xl text-center">{t('description')}</p>
          <Link
            href="/stations"
            className="px-8 py-4 text-xl rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-br"
          >
            {t('enter-app-button')}
          </Link>
        </div>
      </div>
    </header>
  )
}
