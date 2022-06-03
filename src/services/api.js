import axios from 'axios'

const api = axios.create({
  baseURL: 'http://10.0.0.8:1337/'
})

export default api
