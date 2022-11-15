import api from '../utils/api'

export async function getMeasures(stationId: string | undefined) {
  if(stationId === undefined) {
    throw new Error('No station id provided')
  }
  const response = await api.get<StationMeasure[]>(`/stations/${stationId}/measures`)
  if(response.data === undefined) {
    return null
  }
  return response.data
  console.log(response.data)
}