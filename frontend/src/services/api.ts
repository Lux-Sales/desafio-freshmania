import axios from 'axios'

const api = axios.create({ 
    baseURL: 'http://172.24.0.4:5000/' 
})

export default api