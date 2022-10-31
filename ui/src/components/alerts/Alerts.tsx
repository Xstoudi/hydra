import { useContext } from 'react'
import { AlertContext } from './AlertProvider'
import Alert from './Alert'

export default function Alerts() {
  const { alerts, alert } = useContext(AlertContext)
  
  return alerts.map(alert => (
    <Alert key={alert.id} alert={alert} />
  ))
}