import axios from 'axios'

export default axios.create({
  baseURL: import.meta.env.VITE_APP_API_URI || 'http://localhost:3000/api'
})
