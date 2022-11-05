import axios from 'axios'
import { t } from 'i18next'
import { toast } from 'react-toastify'

interface ValidationError {
  rule: string
  field: string
  message: string
}

const api = axios.create({
  baseURL: !process.env.NODE_ENV || process.env.NODE_ENV === 'development' ? 'http://localhost:3333/api' : '/api',
  timeout: 1000,
})

api.interceptors.response.use(
  (response) => response, 
  (error) => {
    const messages: string[] = error.response.data.errors.map((error: ValidationError) => error.message)
    messages.forEach(message => toast.error(t(message as unknown as TemplateStringsArray)))
    return error
  })

export default api