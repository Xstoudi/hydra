import { useTranslation } from 'react-i18next'

import LangSelector from './LangSelector'

export default function Hero() {
  const { t } = useTranslation('home')

  navigator.geolocation.getCurrentPosition(
    position => {
      console.log(position)
    },
    error => {
      console.log(error)
    }
  )

  return (
    <header className=' bg-hero-background bg-cover bg-center'>
      <div className='h-screen w-full backdrop-blur-sm'>
        <div className='absolute top-8 right-16 m-16'>
          <LangSelector />
        </div>
        <div className='flex h-full w-full flex-col items-center justify-center  gap-4 text-white'>
          <h1 className='text-6xl'>Hydra</h1>
          <p className='text-center text-2xl'>{t('description')}</p>
          <a href='/stations' className='rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 py-4 px-8 text-xl'>
            {t('enter-app-button')}
          </a>
        </div>
      </div>
    </header>
  )
}
