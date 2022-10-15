type OFEVStationsResponse = OFEVStationLight[]

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
