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
import { logMessage } from './util'

export default {
  props: ['messages'],
  components: {
    Message
  },
  methods: {
    onMessageClick(message) {
      logMessage(message)
      // rest of
    }
  }
}
</script>
