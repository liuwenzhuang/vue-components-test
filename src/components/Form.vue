<template>
  <div>
    <form @submit.prevent="onSubmit(inputValue)">
      <input type="text" v-model="inputValue" />
      <slot name="button">
        <button type="submit">Submit</button>
      </slot>
    </form>
    <slot v-bind:results="results"></slot>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      inputValue: '',
      results: []
    }
  },
  methods: {
    onSubmit(value) {
      return axios
        .get(`https://jsonplaceholder.typicode.com/posts?q=${value}`)
        .then(res => {
          this.results = res.data
          return res
        })
    }
  }
}
</script>
