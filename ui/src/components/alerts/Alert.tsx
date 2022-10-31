import { Alert } from "./AlertProvider"

interface AlertProps {
  alert: Alert
}

export default function Alert({ alert }: AlertProps) {
  return (
    <div className={'p-4 mb-4 text-sm text-green-700 bg-green-100 rounded-lg dark:bg-green-200 dark:text-green-800'} role='alert'>
      <span className='font-medium'>Success alert!</span> Change a few things up and try submitting again.
    </div>
  )
}