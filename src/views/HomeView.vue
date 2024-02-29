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
    <Temperature  />


    <table class="table-fixed">
      <thead>
        <tr>
          <th>Data</th>
          <th>Temperatura 2m</th>
          <th>Temperatura Aparente</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>{{ data.hourly.time[25]}}</td>
          <td>{{ (data.hourly.temperature2m[25]).toFixed(2) }}</td>
          <td>{{ (data.hourly.apparentTemperature[25]).toFixed(2) }}</td>
        </tr>
        <tr>
          <td>{{ data.hourly.time[26]}}</td>
          <td>{{ (data.hourly.temperature2m[26]).toFixed(2) }}</td>
          <td>{{ (data.hourly.apparentTemperature[26]).toFixed(2) }}</td>
        </tr>
        <tr>
          <td>{{ data.hourly.time[27]}}</td>
          <td>{{ (data.hourly.temperature2m[27]).toFixed(2) }}</td>
          <td>{{ (data.hourly.apparentTemperature[27]).toFixed(2) }}</td>
        </tr>
        
      </tbody>
    </table>
  </main>
</template>
