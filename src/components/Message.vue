<template>
  <li class="message" style="margin-top: 10px;" @click="onMessageClick">
    <span>{{ message }}</span>
    <span style="padding-left: 8px;">{{ reversedMessage }}</span>
  </li>
</template>

<script>
import { logMessage } from './util'

export default {
  props: {
    message: String,
    author: {
      type: String,
      default: 'LWZ',
      validator: author => author.length > 1
    }
  },
  data() {
    return {
      nextMessage: ''
    }
  },
  watch: {
    nextMessage(newV, oldV) {
      if (newV !== oldV) {
        console.debug(newV)
      }
    }
  },
  methods: {
    onMessageClick() {
      logMessage('')
      this.$emit('message-click', this.message)
    }
  },
  computed: {
    reversedMessage() {
      if (!this.message || typeof this.message !== 'string') {
        return ''
      }
      return this.message
        .split('')
        .reverse()
        .join('')
    }
  }
}
</script>
