<script setup>
  defineProps({
  msg: {
    type: String,
    required: true
  }
})
</script>

<template>
  <div class="greetings">
    <h1>{{ msg }}</h1>
  </div>
</template>

<style scoped>
  h1 {
    color: var(--color-heading);
    font-weight: 500;
    font-size: 1.6rem;
    position: relative;
    top: -10px;
  }

  h3 {
    font-size: 1rem;
    color: var(--color-text)
  }

  .greetings h1,
  .greetings h3 {
    text-align: center;
  }

  @media (min-width: 1024px) {
    .greetings h1,
    .greetings h3 {
      text-align: left;
    }
  }
</style>
