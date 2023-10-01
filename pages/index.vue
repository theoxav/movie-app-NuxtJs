<template>
  <div class="home">
    <!-- Hero -->
    <Hero />

    <!-- Search Movies -->
    <SearchMovies :search-input.sync="searchInput" @reset-search="reset" />

    <!-- Loading-->
    <DSLoading v-if="$fetchState.pending" />
    <!-- Movies -->
    <TheMoviesList v-else :movies="getMovies" />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Hero from '@/components/US/Hero/Hero.vue'
import DSLoading from '@/components/DS/DSLoading/DSLoading.vue'
import SearchMovies from '@/components/US/Movies/List/components/SearchMovies.vue'
import TheMoviesList from '~/components/US/Movies/List/TheMoviesList.vue'

export default {
  components: {
    Hero,
    TheMoviesList,
    SearchMovies,
    DSLoading,
  },
  data() {
    return {
      searchInput: '',
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
        this.fetchMovies()
        this.$store.dispatch('movies/resetSearchInput', false)
      } else {
        this.$store.dispatch('movies/searchMovies', value)
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
    },
  },
}
</script>

<style lang="scss">
.home {
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
