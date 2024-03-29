import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

import LangSelector from './selector/LangSelector'

export default function Hero() {
  const { t } = useTranslation('home')

  return (
    <header className='bg-hero-background bg-cover bg-center'>
      <div className='h-screen w-full backdrop-blur-sm'>
        <div className='absolute mx-auto w-40 inset-x-0 top-12 md:right-12 md:mr-0'>
          <LangSelector />
        </div>
        <div className='flex h-full w-full flex-col items-center justify-center gap-4 text-white'>
          <img src='/hydra.svg' alt='Hydra logo' className='h-60 w-60' />
          <h1 className='text-6xl'>Hydra</h1>
          <p className='text-center text-2xl'>{t('description')}</p>
          <Link to='/stations' className='rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 py-4 px-8 text-xl hover:bg-gradient-to-br'>{t('enter-app-button')}</Link>
        </div>
      </div>
    </header>
  )
}
