import { useTranslation } from 'react-i18next'

import LangSelector from './LangSelector'

export default function Hero() {
  const { t } = useTranslation('home')

  return (
    <header className=' bg-hero-background bg-cover bg-center'>
      <div className='w-full h-screen backdrop-blur-sm'>
        <div className='absolute m-16 top-8 right-16'>
          <LangSelector />
        </div>
        <div className='w-full h-full flex flex-col justify-center items-center  text-white gap-4'>
          <h1 className='text-6xl'>Hydra</h1>
          <p className='text-2xl text-center'>
            {t('description')}
          </p>
          <a href='/stations' className='py-4 px-8 text-xl rounded-full bg-gradient-to-r from-cyan-500 to-blue-500'>{ t('enter-app-button') }</a>
        </div> 
      </div>
    </header>
  )
}