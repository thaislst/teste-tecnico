<script setup>
  import { ref } from 'vue';
  import windAPI from '@/stores/windAPI'

  const data = ref(null);

  async function initialWindAPI() {
    data.value = await windAPI({});
  }

  initialWindAPI()
</script>


<template>
  <main>
    <div class="wind">
    <h1 class="title">Vento</h1>

    <h3>Hora</h3>
    <div v-if="data">{{ data.hourly.time[25]}}</div>

    <h3>Vento 10m</h3>
    <div v-if="data">{{ data.hourly.windSpeed10m[25]}}</div>

    <h3>Vento 180m</h3>
    <div v-if="data">{{ data.hourly.windSpeed180m[25]}}</div>
  </div>

  </main>
  
</template>

<style>

.title {
  margin-bottom: 10px;
}
@media (min-width: 1024px) {
  .wind {
    min-height: 100vh;
    display: block;    
    align-items: center;
  }
}
</style>
