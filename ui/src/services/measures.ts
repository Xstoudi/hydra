import { DateTime } from 'luxon'
import api from '../utils/api'

export async function getMeasures(
  stationId: string | undefined,
  from: DateTime | null = null,
  to: DateTime | null = null,
  grouping: string
) {
  if(stationId === undefined) {
    throw new Error('No station id provided')
  }
  const response = await api.get<StationMeasure[]>(`/stations/${stationId}/measures`, {
    params: {
      from: from?.toISO(),
      to: to?.toISO(),
      grouping: grouping !== 'none' ? grouping : null
    }
  })
  if(response.data === undefined) {
    return null
  }
  return response.data
}