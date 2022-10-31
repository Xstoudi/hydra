import { useCallback, useContext, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { toast } from 'react-toastify'
import { PositionContext } from '../contexts/PositionContext'

export default function usePosition() {
  const { position, setPosition } = useContext(PositionContext)
  const [requesting, setRequesting] = useState(false)
  const { t } = useTranslation('stations')
  const locate = useCallback(() => {
    setRequesting(true)
  }, [setRequesting])

  const onChange = ({ coords }: GeolocationPosition) => {
    setPosition({
      accuracy: coords.accuracy,
      altitude: coords.altitude,
      altitudeAccuracy: coords.altitudeAccuracy,
      heading: coords.heading,
      latitude: coords.latitude,
      longitude: coords.longitude,
      speed: coords.speed,
    })
    setRequesting(false)
  }

  const onError = () => {
    toast.error(t('geolocation.errors.generic'))
    setRequesting(false)
    setPosition(null)
  }

  useEffect(() => {
    if (requesting === false) {
      return
    }

    const geolocation = navigator.geolocation
    if(geolocation === undefined) {
      toast.error(t('geolocation.errors.unsupported'))
      return
    }

    geolocation.getCurrentPosition(onChange, onError)
  }, [requesting])

  return { position, locate, requesting }
}