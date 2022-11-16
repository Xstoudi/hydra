import { DivIcon, LeafletMouseEvent } from 'leaflet'
import { memo, useEffect, useMemo } from 'react'
import { Marker, useMap, useMapEvents } from 'react-leaflet'
import { renderToString } from 'react-dom/server'

import { swissCenterPosition } from './SwissMap'
import Twemoji from './Twemoji'
import { useNavigate } from 'react-router-dom'

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
  const navigate = useNavigate()

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
        navigate(`/stations/${e.target.options['data-id']}`)
      },
    }
  }, [navigate])

  return <>
    {
      stations.map(station => (
        <Marker
          key={station.id}
          eventHandlers={markerHandlers}
          data-id={station.id}
          position={[station.coordinates.latitude, station.coordinates.longitude]}
          icon={icon}
        />
      ))
    }
  </>
}

export default memo(StationsLayer)