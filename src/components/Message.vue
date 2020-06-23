<template>
  <li class="message" style="margin-top: 10px;" @click="onMessageClick">
    {{ message }}
  </li>
</template>

<script>
export default {
  props: {
    message: String,
    author: {
      type: String,
      default: 'LWZ',
      validator: author => author.length > 1
    }
  },
  methods: {
    onMessageClick() {
      this.$emit('message-click', this.message)
    }
  }
}
</script>
