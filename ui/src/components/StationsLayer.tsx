import { memo, useEffect } from 'react'
import { Marker, useMap, useMapEvents } from 'react-leaflet'
import { centerPosition } from './SwissMap'

interface StationsLayerProps {
  stations: StationData[]
  updateBounds: (bounds: L.LatLngBounds) => void
  wantedPosition: [number, number]
}

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
        <Marker key={station.id} position={[station.coordinates.latitude, station.coordinates.longitude]} />
      ))
    }
  </>
}

export default memo(StationsLayer)