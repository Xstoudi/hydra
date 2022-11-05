import api from '../utils/api'

export async function getStations(position: GeolocationCoordinates | null) {
  const params = position !== null ? { lat: position.latitude, lon: position.longitude } : { lat: 200, lon: 0 }
  const response = await api.get<StationData[]>('/stations', { params })
  return response.data || null
}
