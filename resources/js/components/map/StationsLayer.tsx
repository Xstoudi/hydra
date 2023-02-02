import { DivIcon } from 'leaflet'
import type { LeafletMouseEvent } from 'leaflet'
import { useEffect, useMemo } from 'react'
import { renderToString } from 'react-dom/server'
import { Marker, useMap, useMapEvents } from 'react-leaflet'

import Twemoji from '../utils/Twemoji'
import { Inertia } from '@inertiajs/inertia'
import { swissCenterPosition } from '../../utils/swissCenterPosition'

interface StationsLayerProps {
  stations: StationData[]
  updateBounds?: (bounds: L.LatLngBounds) => void
  wantedPosition?: [number, number]
}

const icon = new DivIcon({
  html: renderToString(<Twemoji emoji="📍" size="lg" className="ml-[-14px] mt-[-32px]" />),
  className: '',
})

export default function StationsLayer({
  stations,
  updateBounds,
  wantedPosition,
}: StationsLayerProps) {
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

  const markerHandlers = useMemo(() => {
    return {
      click: (e: LeafletMouseEvent) => {
        Inertia.visit(`/stations/${e.target.options['data-id']}`)
      },
    }
  }, [])

  return (
    <>
      {stations.map((station) => (
        <Marker
          key={station.id}
          eventHandlers={markerHandlers}
          data-id={station.id}
          position={[station.coordinates.latitude, station.coordinates.longitude]}
          icon={icon}
        />
      ))}
    </>
  )
}
