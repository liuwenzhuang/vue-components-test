<template>
  <ul>
    <Message v-for="message in messages" :message="message" :key="message" />
  </ul>
</template>

<script>
import Message from './Message.vue'

export default {
  props: ['messages'],
  components: {
    Message
  }
}
</script>
