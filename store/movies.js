import MovieService from '@/services/api/MovieServices';

export const state = () => ({
  movies: [],
  movie: null,
  searchedMovies: [],
  isSearchMode: false,
});

export const mutations = {
  SET_MOVIES(state, movies) {
    state.movies = movies;
  },
  SET_MOVIE(state, movie) {
    state.movie = movie;
  },
  SET_SEARCHED_MOVIES(state, movies) {
    state.searchedMovies = movies;
  },
  SET_IS_SEARCH_MODE(state, isSearchMode) {
    state.isSearchMode = isSearchMode;
  },
};

export const actions = {
  async fetchMovies({ commit }) {
    try {
      const movies = await MovieService.getAll();
      commit('SET_MOVIES', movies);
    } catch (error) {
      console.error('Error fetching movies:', error);
    }
  },

  async fetchMovieById({ commit }, movieId) {
    try {
      const movie = await MovieService.getById(movieId);
      commit('SET_MOVIE', movie);
    } catch (error) {
      console.error('Error fetching movie by ID:', error);
    }
  },

  async searchMovies({ commit }, inputSearch) {
    try {
      const searchedMovies = await MovieService.searchMovies(inputSearch);
      commit('SET_SEARCHED_MOVIES', searchedMovies);
      commit('SET_IS_SEARCH_MODE', true);
    } catch (error) {
      console.error('Error searching movies:', error);
    }
  },

  resetSearchInput({ commit }, value) {
    commit('SET_IS_SEARCH_MODE', value);
  },
};
