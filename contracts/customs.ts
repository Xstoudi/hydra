type OFEVStationsResponse = OFEVStationLight[]
type OFEVStationsWithDataResponse = Record<string, OFEVStationResponse>

interface OFEVStationLight {
  id: string
  name: string
  waterBodyName: string
  waterBodyType: 'river' | 'lake' | 'spring' | 'piezometer' | 'well' | 'groundwater'
}

type OFEVStationResponse = Omit<OFEVStationLight, 'id'> & {
  coordinates: {
    latitude: number
    longitude: number
  }
  parameters: StationParameters
}

type StationParameters = {
  level?: {
    unit: 'm'
  } & StationParameterCommon
  discharge?: {
    unit: 'm3/s' | 'l/s' | 'l/min'
  } & StationParameterCommon
  temperature?: {
    unit: '°C'
  } & StationParameterCommon
}

type StationParameterCommon = {
  datetime: string
  value: number
  max24h: number
  mean24h: number
  min24h: number
}

type GeoCoordinate = { latitude: number; longitude: number }

type StationData = {
  id: number
  name: string
  coordinates: { latitude: number; longitude: number }
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
