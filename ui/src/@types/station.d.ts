type StationData = {
  id: number
  name: string
  coordinates: { latitude: number, longitude: number }
  water_body_name: string
  water_body_type: 'river' | 'lake' | 'spring' | 'piezometer' | 'well' | 'groundwater'
  vendor_identifier: string
  meta: {
    temperature: number | null
    discharge: number | null
    level: number | null
    last_measured_at: string
    dl2: number | null
    dl3: number | null
    dl4: number | null
    dl5: number | null
    dl_measure_type: MeasureType | null
  }
}

type MeasureType = 'level' | 'discharge' | 'temperature'