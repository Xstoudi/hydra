import { useCallback, useContext, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { AlertContext } from '../components/alerts/AlertProvider'

export default function usePosition() {
  const [position, setPosition] = useState<GeolocationCoordinates | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [requesting, setRequesting] = useState(false)

  const { alert } = useContext(AlertContext)

  const { t } = useTranslation('stations')

  const locate = useCallback(() => {
    const geolocation = navigator.geolocation
    if(geolocation === undefined) {
      alert(t('geolocation.errors.unsupported'), 'error')
      return
    }

    setRequesting(true)

    geolocation.getCurrentPosition(
      (position: GeolocationPosition) => {
        setPosition(position.coords)
        setRequesting(false)
      },
      () => {
        setPosition(null)
        alert(t('geolocation.errors.generic'), 'error')
        setRequesting(false)
      }
    )
  }, [setPosition, setRequesting, setError])

  return { position, error, locate, requesting }
}