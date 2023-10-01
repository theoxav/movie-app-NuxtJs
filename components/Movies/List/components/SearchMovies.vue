<template>
  <div class="container search">
    <input
      :value="searchInput"
      placeholder="Search"
      type="text"
      @input="$emit('update:search-input', $event.target.value)"
    />
    <button v-show="searchInput !== ''" class="button" @click="reset">
      Clear Search
    </button>
  </div>
</template>

<script>
export default {
  props: {
    searchInput: {
      type: String,
      required: true,
    },
  },
  methods: {
    reset() {
      this.$emit('reset-search')
    },
  },
}
</script>
