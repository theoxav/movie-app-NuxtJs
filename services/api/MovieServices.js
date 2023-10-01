import axiosInstance from '@/plugins/axios-plugins'

export default class MoviesService {
  static async getAll() {
    try {
      const response = await axiosInstance.get('movie/now_playing')
      return response.data.results
    } catch (error) {
      throw new Error('Error fetching movies')
    }
  }

  static async getById(movieId) {
    try {
      const response = await axiosInstance.get(`movie/${movieId}`)
      return response.data
    } catch (error) {
      throw new Error('Error fetching movie by ID')
    }
  }

  static async searchMovies(query) {
    try {
      const response = await axiosInstance.get('search/movie', {
        params: {
          query,
          page: 1,
        },
      })
      return response.data.results
    } catch (error) {
      throw new Error('Error searching movies')
    }
  }
}
