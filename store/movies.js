import axios from 'axios'

export const state = () => ({
  movies: [],
  searchedMovies: [],
  isSearchMode: false,
})

export const mutations = {
  SET_MOVIES(state, movies) {
    state.movies = movies
  },
  SET_SEARCHED_MOVIES(state, movies) {
    state.searchedMovies = movies
  },
  SET_IS_SEARCH_MODE(state, isSearchMode) {
    state.isSearchMode = isSearchMode
  },
}

export const actions = {
  async fetchMovies({ commit }) {
    try {
      const response = await axios.get(
        'https://api.themoviedb.org/3/movie/now_playing?api_key=985325e85babad8daa9c3d33d2836e61&language=en-US&page=1'
      )
      commit('SET_MOVIES', response.data.results)
    } catch (error) {
      console.error('Error fetching movies:', error)
    }
  },

  async searchMovies({ commit }, inputSearch) {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/search/movie?api_key=985325e85babad8daa9c3d33d2836e61&language=en-US&page=1&query=${inputSearch}`
      )
      commit('SET_SEARCHED_MOVIES', response.data.results)
      commit('SET_IS_SEARCH_MODE', true)
    } catch (error) {
      console.error('Error searching movies:', error)
    }
  },

  resetSearchInput({ commit }, value) {
    commit('SET_IS_SEARCH_MODE', value)
  },
}
