import axios from 'axios';

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
  fetchMovies: async ({ commit }) => {
    const response = await axios.get(
      'https://api.themoviedb.org/3/movie/now_playing?api_key=985325e85babad8daa9c3d33d2836e61&language=en-US&page=1'
    );
    commit('SET_MOVIES', response.data.results);
  },

  fetchMovieById: async ({ commit }, movieId) => {
    const response = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}?api_key=985325e85babad8daa9c3d33d2836e61&language=en-US`);
    commit('SET_MOVIE', response.data);
     },

  searchMovies: async ({ commit }, inputSearch) => {
    const response = await axios.get(
      `https://api.themoviedb.org/3/search/movie?api_key=985325e85babad8daa9c3d33d2836e61&language=en-US&page=1&query=${inputSearch}`
    );
    commit('SET_SEARCHED_MOVIES', response.data.results);
    commit('SET_IS_SEARCH_MODE', true);
  },

  resetSearchInput:  ({ commit }, value) => {
    commit('SET_IS_SEARCH_MODE', value);
  },
};
