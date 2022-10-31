import { createContext, Dispatch, SetStateAction, useState } from 'react'

interface PositionProviderProps {
  children: React.ReactNode
}

interface PositionContextProps {
  position: GeolocationCoordinates | null
  setPosition: Dispatch<SetStateAction<GeolocationCoordinates | null>>
}

export const PositionContext = createContext<PositionContextProps | null>(null)
PositionContext.displayName = 'PositionContext'

export default function PositionProvider({ children }: PositionProviderProps) {
  const [position, setPosition] = useState<GeolocationCoordinates | null>(null)

  return (
    <PositionContext.Provider value={{ position, setPosition }}>
      {children}
    </PositionContext.Provider>
  )
}