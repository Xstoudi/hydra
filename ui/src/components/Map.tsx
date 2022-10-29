import { MapContainer, TileLayer, Marker } from 'react-leaflet'

interface MapProps {
  stations: StationData[]
}

export default function Map({ stations }: MapProps) {
  return (
    <MapContainer
      center={[46.798333, 8.231944]}
      zoom={9}
      scrollWheelZoom={false}
      style={{ height: 'calc(100vh - 82px)' }}
      className='z-0'
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
      />
      {
        stations.map(station => (
          <Marker key={station.id} position={[station.coordinates.latitude, station.coordinates.longitude]} />
        ))
      }
    </MapContainer>
  )
}
