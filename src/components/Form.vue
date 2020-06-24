<template>
  <div>
    <form @submit.prevent="onSubmit(inputValue)">
      <input type="text" v-model="inputValue" />
      <button type="submit">Submit</button>
    </form>
    <div v-for="item in results" :key="item.title">{{ item.title }}</div>
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
