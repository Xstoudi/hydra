import { memo } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

import LangSelector from './LangSelector'

function Hero() {
  const { t } = useTranslation('home')

  return (
    <header className=' bg-hero-background bg-cover bg-center'>
      <div className='h-screen w-full backdrop-blur-sm'>
        <div className='absolute top-8 right-16 m-16'>
          <LangSelector />
        </div>
        <div className='flex h-full w-full flex-col items-center justify-center  gap-4 text-white'>
          <h1 className='text-6xl'>Hydra</h1>
          <p className='text-center text-2xl'>{t('description')}</p>
          <Link to='/stations' className='rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 py-4 px-8 text-xl hover:bg-gradient-to-br'>{t('enter-app-button')}</Link>
        </div>
      </div>
    </header>
  )
}

export default memo(Hero)