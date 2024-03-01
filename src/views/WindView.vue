<script setup>
  import { ref } from 'vue';
  import windAPI from '@/stores/windAPI'
  import formatDate from '@/stores/formatDate.js';

  const data = ref(null);

  async function initialWindAPI() {
    try {
      data.value = await windAPI({});
    } catch (err) {
      error.value = err.message || 'Ocorreu um erro ao obter os dados da API';
    }
  }

  initialWindAPI()
</script>


<template>
  <main>
    <div class="wind">
    <h1 class="title">Vento</h1>


    <table class="table-fixed" v-if="data">
      <thead>
        <tr>
          <th class="p-4 font-bold ">Data/Hora</th>
          <th class="p-4 font-bold">Vento 10m</th>
          <th class="p-4 font-bold">Vento 80m</th>
          <th class="p-4 font-bold">Vento 120m</th>
          <th class="p-4 font-bold">Vento 180m</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in data.hourly.time" :key="index">
          <td class="p-2 text-center">{{formatDate(item)}}</td>
          <!-- Use v-if para verificar se os dados estão definidos -->
          <td class="p-2 text-center" v-if="data.hourly.windSpeed10m[index]">{{ data.hourly.windSpeed10m[index].toFixed(1) }}</td>
          <td v-else>N/A</td> <!-- Se não estiver definido, exiba N/A -->
          <td class="p-2 text-center" v-if="data.hourly.windSpeed80m[index]">{{ data.hourly.windSpeed80m[index].toFixed(1) }}</td>
          <td v-else>N/A</td> <!-- Se não estiver definido, exiba N/A -->
           <!-- Use v-if para verificar se os dados estão definidos -->
           <td class="p-2 text-center" v-if="data.hourly.windSpeed120m[index]">{{ data.hourly.windSpeed120m[index].toFixed(1) }}</td>
          <td v-else>N/A</td> <!-- Se não estiver definido, exiba N/A -->
          <td class="p-2 text-center" v-if="data.hourly.windSpeed180m[index]">{{ data.hourly.windSpeed180m[index].toFixed(1) }}</td>
          <td v-else>N/A</td> <!-- Se não estiver definido, exiba N/A -->
        </tr>
        
      </tbody>
    </table>

    <!-- <h3>Hora</h3>
    <div v-if="data">{{ data.hourly.time[25]}}</div>

    <h3>Vento 10m</h3>
    <div v-if="data">{{ data.hourly.windSpeed10m[25]}}</div>

    <h3>Vento 180m</h3>
    <div v-if="data">{{ data.hourly.windSpeed180m[25]}}</div> -->
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
