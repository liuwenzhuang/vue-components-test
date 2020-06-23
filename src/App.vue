<template>
  <div id="app">
    <MessageList :messages="messages" />
  </div>
</template>

<script>
import MessageList from './components/MessageList.vue'

export default {
  name: 'App',
  components: {
    MessageList
  },
  data() {
    return {
      messages: ['Msg1', 'Msg2']
    }
  }
}
</script>

<style lang="less">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
