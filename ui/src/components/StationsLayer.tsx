import { DivIcon } from 'leaflet'
import { memo, useEffect } from 'react'
import { Marker, useMap, useMapEvents } from 'react-leaflet'
import { renderToString } from 'react-dom/server'

import { swissCenterPosition } from './SwissMap'
import Twemoji from './Twemoji'

interface StationsLayerProps {
  stations: StationData[]
  updateBounds?: (bounds: L.LatLngBounds) => void
  wantedPosition?: [number, number]
}

const icon = new DivIcon({
  html: renderToString(<Twemoji emoji='📍' size='lg' className='ml-[-14px] mt-[-32px]' />),
  className: '',
})

function StationsLayer({ stations, updateBounds, wantedPosition }: StationsLayerProps) {
  const map = useMap()

  useMapEvents({
    zoomend: () => updateBounds !== undefined && updateBounds(map.getBounds()),
    moveend: () => updateBounds !== undefined && updateBounds(map.getBounds()),
  })

  useEffect(() => {
    if (wantedPosition !== undefined) {
      map.flyTo(wantedPosition, wantedPosition === swissCenterPosition ? 9 : 12)
    }
  }, [wantedPosition])

  return <>
    {
      stations.map(station => (
        <Marker key={station.id} position={[station.coordinates.latitude, station.coordinates.longitude]} icon={icon} />
      ))
    }
  </>
}

export default memo(StationsLayer)