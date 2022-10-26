import axios from 'axios'

export default axios.create({
  baseURL: !process.env.NODE_ENV || process.env.NODE_ENV === 'development' ? 'http://localhost:3333/api' : '/api',
  timeout: 1000,
})
