import { Trans, useTranslation } from 'react-i18next'

export default function Footer() {
  const { t } = useTranslation('common')

  return (
    <div className='mx-8 mt-8 border-t-2 border-gray-100 bg-white py-8'>
      <div className='mx-16 grid grid-rows-3 md:grid-rows-none md:grid-cols-2 md:gap-8 lg:gap-16 xl:grid-cols-3 2xl:mx-72 justify-between gap-4'>
        <div className='flex flex-col'>
          <h3 className='text-2xl'>{t('layout.sources')}</h3>
          <p>
            <Trans t={t} i18nKey='layout.sources-info'>
              <a href='https://www.bafu.admin.ch/bafu/en/home.html' className='text-blue-500'>OFEV</a>
              <a href='https://swisshydroapi.bouni.de/' className='text-blue-500'>SwissHydroAPI</a>
            </Trans>
          </p>
        </div>
        <div className='flex flex-col'>
          <h3 className='text-2xl'>{t('layout.contact')}</h3>
          <p>
            <Trans t={t} i18nKey='layout.contact-info'>
              <a href='mailto:xavier@stouder.io' className='text-blue-500'>xavier@stouder.io</a>
            </Trans>
          </p>
        </div>
        <div className='flex flex-col'>
          <h3 className='text-2xl'>{t('layout.about')}</h3>
          <p>
            <Trans t={t} i18nKey='layout.about-info'>
              <a href='https://github.com/Xstoudi/hydra' className='text-blue-500'>GitHub</a>
              <a href='https://www.he-arc.ch/' className='text-blue-500'>HE Arc</a>
            </Trans>
          </p>
        </div>
      </div>
    </div>
  )
}
