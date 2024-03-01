<script setup>
import { ref, onMounted } from 'vue';
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'
import tempApi from '@/stores/tempApi.js';
import formatDate from '@/stores/formatDate.js';

const data = ref(null);
const error = ref(null); 

const date = ref();
const SelectedDate = ref(null);


async function initialTempApi() {
  try {
    data.value = await tempApi({});
  } catch (err) {
    error.value = err.message || 'Ocorreu um erro ao obter os dados da API';
  }
}

// Função para lidar com a seleção de data no VueDatePicker
const handleDateSelection = (date) => {
  SelectedDate.value = date;
  console.log(date)
}

initialTempApi();


</script>

<template>
  <main>
    
    <VueDatePicker 
      v-model="date" 
      :range="{ partialRange: false }"  
      @internal-model-change="handleDateSelection" 
    />


    <table class="table-fixed" v-if="data">
      <thead>
        <tr class="border-2 bg-comerc-blue text-white">
          <th class="p-6 font-bold ">Data/Hora</th>
          <th class="p-6 font-bold">Temperatura 2m</th>
          <th class="p-6 font-bold">Temperatura Aparente</th>
        </tr>
        <tr class="border-2 bg-comerc-blue text-white">
          <th class=" font-semibold border-2"> Dia/Mês Hora </th>
          <th class="font-semibold border-2">°C</th>
          <th class=" font-semibold border-2">°C</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in data.hourly.time" :key="index">
          <td class="p-4 text-center border-2">{{formatDate(item)}}</td>
          <!--  verificar se os dados estão definidos -->
          <td class="p-4 text-center border-2" v-if="data.hourly.temperature2m[index]">{{ data.hourly.temperature2m[index].toFixed(1) }}</td>
          <td v-else>N/A</td> <!-- Se não estiver definido, exiba N/A -->
          <td class="p-4 text-center border-2" v-if="data.hourly.apparentTemperature[index]">{{ data.hourly.apparentTemperature[index].toFixed(1) }}</td>
          <td v-else>N/A</td> 
        </tr>  
      </tbody>
    </table>

    
  </main>
</template>
