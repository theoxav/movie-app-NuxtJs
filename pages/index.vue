<template>
  <div class="home">
    <!-- Hero -->
    <Hero />
    <!-- Search-->
    <div class="container search">
      <input
        v-model="searchInput"
        placeholder="Search"
        type="text"
        @keyup="$fetch"
      />
      <button v-show="searchInput !== ''" class="button" @click="reset">
        Clear Search
      </button>
    </div>
    <!-- Movies-->
    <TheMoviesList :movies="getMovies" />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import TheMoviesList from '~/components/Movies/List/TheMoviesList.vue'

export default {
  components: {
    TheMoviesList,
  },
  data() {
    return {
      searchInput: '',
    }
  },
  fetch() {
    if (this.searchInput === '') {
      this.reset()
      return this.fetchMovies()
    }
    this.searchMovies()
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

  methods: {
    async fetchMovies() {
      await this.$store.dispatch('movies/fetchMovies')
    },
    async searchMovies() {
      await this.$store.dispatch('movies/searchMovies', this.searchInput)
    },
    reset() {
      this.$store.dispatch('movies/resetSearchInput')
      this.searchInput = ''
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
