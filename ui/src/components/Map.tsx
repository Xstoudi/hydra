import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'

export default function Map() {
  return (
    <MapContainer center={[46.798333, 8.231944]} zoom={9} scrollWheelZoom={false} style={{ height: 'calc(100vh - 82px)' }}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
      />
      <Marker position={[51.505, -0.09]}>
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </Marker>
    </MapContainer>
  )
}