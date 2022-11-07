import api from '../utils/api'

export async function getStations(position: GeolocationCoordinates | null) {
  const params = position !== null ? { lat: position.latitude, lon: position.longitude } : { }
  const response = await api.get<StationData[]>('/stations', { params })
  return response.data || null
}

export async function getStation(id: string | undefined) {
  if(id === undefined) {
    throw new Error('No id provided')
  }
  const response = await api.get<StationData>(`/stations/${id}`)
  return response.data || null
}