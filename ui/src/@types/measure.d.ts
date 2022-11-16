type StationMeasure = {
  id: number
  station_id: number
  type: string
  value: number
  measured_at: string
  created_at: string
  updated_at: string
}

type Serie = {
  date: string
  temperature?: number
  discharge?: number
  level?: number
}