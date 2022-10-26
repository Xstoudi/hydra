import api from '../utils/api'

export async function getStations() {
  const response = await api.get<StationData[]>('/stations')
  return response.data
}
