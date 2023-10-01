<template>
  <div>
    <TheMovieDetail :movie="movie" />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import TheMovieDetail from '@/components/US/Movies/Detail/TheMovieDetail.vue'

export default {
  name: 'TheMovieDetailPage',
  components: {
    TheMovieDetail,
  },
  async fetch() {
    await this.fetchMovie()
  },
  computed: {
    ...mapState({
      movie: (state) => state.movies.movie,
    }),
  },
  methods: {
    async fetchMovie() {
      await this.$store.dispatch('movies/fetchMovieById', this.$route.params.id)
    },
  },
}
</script>
