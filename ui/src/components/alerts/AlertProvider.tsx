import React, { useCallback, useState } from 'react'

export interface Alert {
  id: number
  text: string
  type: 'success' | 'error'
  removing: boolean
}

interface AlertProviderProps {
  children: React.ReactNode
}

interface AlertContext {
  alerts: Alert[]
  alert: (text: string, type: 'success' | 'error') => void
}

const AlertContext = React.createContext<AlertContext>(null)
AlertContext.displayName = 'AlertContext'

let counter = 0

function AlertProvider({ children }: AlertProviderProps) {
  const [alerts, setAlerts] = useState<Alert[]>([])

  const removeAlert = useCallback((id: number) => {
    return () => {
      const alertIndex = alerts.findIndex((alert) => alert.id === id)
      const newAlerts = [...alerts]
      newAlerts.splice(alertIndex, 1)
      setAlerts(newAlerts)
    }
  }, [setAlerts, alerts])

  const prepareRemoving = useCallback((id: number) => {
    return () => {
      console.log('ici', alerts)
      const alertIndex = alerts.findIndex((alert) => alert.id === id)
      const newAlerts = [...alerts]
      newAlerts[alertIndex].removing = true
      setAlerts(newAlerts)
      setTimeout(removeAlert(id), 1000)
    }
  }, [alerts, setAlerts, removeAlert])

  const addAlert = useCallback((text: string, type: 'success' | 'error' ) => {
    setAlerts([...alerts, { id: counter++, text, type, removing: false }])
    setTimeout(prepareRemoving(counter), 5000)
    counter++
  }, [setAlerts, alerts, prepareRemoving])

  return (
    <AlertContext.Provider
      value={
        {
          alerts: alerts,
          alert: addAlert
        }
      }
    >
      {children}
    </AlertContext.Provider>
  )
}

export default AlertProvider
export { AlertContext }