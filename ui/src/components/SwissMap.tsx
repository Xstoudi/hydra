import { memo } from 'react'
import { MapContainer, TileLayer } from 'react-leaflet'

interface SwissMapProps {
  children?: React.ReactNode
}

function SwissMap({ children }: SwissMapProps) {
  return (
    <MapContainer
      center={[46.798333, 8.231944]}
      zoom={9}
      scrollWheelZoom={false}
      style={{ height: 'calc(100vh - 82px)' }}
      className='z-0'
    >
      {children}
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
      />
    </MapContainer>
  )
}

export default memo(SwissMap)