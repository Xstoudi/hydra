import { useCallback } from 'react'
import { Marker, useMap, useMapEvents } from 'react-leaflet'

interface StationsLayerProps {
  stations: StationData[]
  updateBounds: (bounds: L.LatLngBounds) => void
}

export default function StationsLayer({ stations, updateBounds }: StationsLayerProps) {

  const map = useMap() 

  const handleBoundsChange = useCallback(() => {
    updateBounds(map.getBounds())
  }, [map, updateBounds])

  useMapEvents({
    zoomend: handleBoundsChange,
    moveend: handleBoundsChange
  })

  return <>
    {
      stations.map(station => (
        <Marker key={station.id} position={[station.coordinates.latitude, station.coordinates.longitude]} />
      ))
    }
  </>
}