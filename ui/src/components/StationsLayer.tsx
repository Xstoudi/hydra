import { DivIcon } from 'leaflet'
import { memo, useEffect } from 'react'
import { Marker, useMap, useMapEvents } from 'react-leaflet'
import { renderToString } from "react-dom/server";

import { centerPosition } from './SwissMap'
import Twemoji from './Twemoji'

interface StationsLayerProps {
  stations: StationData[]
  updateBounds: (bounds: L.LatLngBounds) => void
  wantedPosition: [number, number]
}

const icon = new DivIcon({
  html: renderToString(<Twemoji emoji='📍' size='lg' className='ml-[-14px] mt-[-32px]' />),
  className: '',
})

function StationsLayer({ stations, updateBounds, wantedPosition }: StationsLayerProps) {
  const map = useMap() 

  useMapEvents({
    zoomend: () => updateBounds(map.getBounds()),
    moveend: () => updateBounds(map.getBounds()),
  })

  useEffect(() => {
    map.flyTo(wantedPosition, wantedPosition === centerPosition ? 9 : 12)
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