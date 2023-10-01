import axios from 'axios'

const apiKey = process.env.TMDB_API_KEY;
const baseURL = process.env.TMDB_API_URL;

const axiosInstance = axios.create({
  baseURL,
  params: {
    api_key: apiKey,
    language: 'en-US',
  },
})

axiosInstance.interceptors.request.use(
  (config) => {
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

axiosInstance.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    return Promise.reject(error)
  }
)

export default axiosInstance
