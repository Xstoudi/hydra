import { useTranslation } from 'react-i18next'
import Footer from '../components/common/Footer'
import Hero from '../components/Hero'

export default function Home() {

  const { t } = useTranslation('home')

  return (
    <div className='flex flex-col gap-8'>
      <Hero />
      <div className='grid grid-cols-1 md:grid-cols-2 px-20 lg:px-40 xl:px-60 2xl:px-80 gap-8 xl:gap-12 2xl:gap-x-16'>
        <div>
          <h2 className='text-3xl'>{t('parts.realtime.title')}</h2>
          <p className='text-lg text-justify'>{t('parts.realtime.description')}</p>
        </div>
        <div>
          <h2 className='text-3xl'>{t('parts.opensource.title')}</h2>
          <p className='text-lg text-justify'>{t('parts.opensource.description')}</p>
        </div>
        <div>
          <h2 className='text-3xl'>{t('parts.unverified.title')}</h2>
          <p className='text-lg text-justify'>{t('parts.unverified.description')}</p>
        </div>
        <div>
          <h2 className='text-3xl'>{t('parts.responsive.title')}</h2>
          <p className='text-lg text-justify'>{t('parts.responsive.description')}</p>
        </div>
      </div>
      <Footer />
    </div>
  )
}
