<script setup>
import { ref } from 'vue';
import Temperature from '@/components/Temperature.vue';
import tempApi from '@/stores/tempApi.js'

const data = ref(null);

async function initialTempApi() {
  data.value = await tempApi({});
}

initialTempApi();

</script>

<template>
  <main>
    <Temperature />

    <h3>Hora</h3>
    <div v-if="data">{{ data.hourly.time[25]}}</div>

    <h3>Temperatura 2m</h3>
    <div v-if="data">{{ data.hourly.temperature2m[25] }}</div>

    <h3>Temperatura Aparente</h3>
    <div v-if="data">{{ data.hourly.apparentTemperature[25] }}</div>
  </main>
</template>
