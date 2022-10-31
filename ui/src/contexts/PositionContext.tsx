import { createContext, Dispatch, SetStateAction, useState } from 'react'

interface PositionProviderProps {
  children: React.ReactNode
}

interface PositionContextProps {
  position: GeolocationCoordinates | null
  setPosition: Dispatch<SetStateAction<GeolocationCoordinates | null>>
}

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
export const PositionContext = createContext<PositionContextProps>(undefined!)
PositionContext.displayName = 'PositionContext'

export default function PositionProvider({ children }: PositionProviderProps) {
  const [position, setPosition] = useState<GeolocationCoordinates | null>(null)

  return (
    <PositionContext.Provider value={{ position, setPosition }}>
      {children}
    </PositionContext.Provider>
  )
}