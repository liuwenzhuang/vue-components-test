<template>
  <ul>
    <Message
      v-for="message in messages"
      :message="message"
      :key="message"
      @message-click="onMessageClick"
    />
  </ul>
</template>

<script>
import Message from './Message.vue'

export default {
  props: ['messages'],
  components: {
    Message
  },
  methods: {
    onMessageClick(message) {
      console.log(message)
    }
  }
}
</script>
