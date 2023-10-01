<template>
  <div class="home">
    <!-- Hero -->
    <Hero />

    <!-- Search Movies -->
    <SearchMovies :search-input.sync="searchInput" @reset-search="reset" />

    <!-- Movies -->
    <TheMoviesList :movies="getMovies" />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import SearchMovies from '~/components/Movies/List/components/SearchMovies.vue'
import TheMoviesList from '~/components/Movies/List/TheMoviesList.vue'

export default {
  components: {
    TheMoviesList,
    SearchMovies,
  },
  data() {
    return {
      searchInput: ''
    }
  },
  async fetch() {
    await this.fetchMovies()
  },
  computed: {
    ...mapState({
      movies: (state) => state.movies.movies,
      searchedMovies: (state) => state.movies.searchedMovies,
      isSearchMode: (state) => state.movies.isSearchMode,
    }),
    getMovies() {
      return this.isSearchMode ? this.searchedMovies : this.movies
    },
  },
  watch: {
    searchInput(value) {
      if (!value.trim()) {
        this.fetchMovies();
        this.$store.dispatch('movies/resetSearchInput', false)
      } else {
        this.$store.dispatch('movies/searchMovies', value);
      }
    },
  },

  methods: {
    async fetchMovies() {
      await this.$store.dispatch('movies/fetchMovies')
    },
    reset() {
      this.$store.dispatch('movies/resetSearchInput')
      this.searchInput = ''
      this.$fetch()
    },
  },
}
</script>

<style lang="scss">
.home {
  .loading {
    padding-top: 120px;
    align-items: flex-start;
  }

  .search {
    display: flex;
    padding: 32px 16px;

    input {
      max-width: 350px;
      width: 100%;
      padding: 12px 6px;
      font-size: 14px;
      border: none;

      &:focus {
        outline: none;
      }
    }

    .button {
      border-top-left-radius: 0;
      border-bottom-left-radius: 0;
    }
  }
}
</style>
