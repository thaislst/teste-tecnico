<script setup>
import { ref, onMounted , watch, provide} from 'vue';

import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'

import tempApi from '@/stores/tempApi.js';
import formatDate from '@/stores/formatDate.js';

import { use } from 'echarts/core';
import { CanvasRenderer } from 'echarts/renderers';
import { PieChart } from 'echarts/charts';
import {
  TitleComponent,
  TooltipComponent,
  LegendComponent,
} from 'echarts/components';
import VChart, { THEME_KEY } from 'vue-echarts';

use([
  CanvasRenderer,
  PieChart,
  TitleComponent,
  TooltipComponent,
  LegendComponent,
]);

provide(THEME_KEY, 'dark');

const option = ref({
  title: {
    text: 'Traffic Sources',
    left: 'center',
  },
  tooltip: {
    trigger: 'item',
    formatter: '{a} <br/>{b} : {c} ({d}%)',
  },
  legend: {
    orient: 'vertical',
    left: 'left',
    data: ['Direct', 'Email', 'Ad Networks', 'Video Ads', 'Search Engines'],
  },
  series: [
    {
      name: 'Traffic Sources',
      type: 'pie',
      radius: '55%',
      center: ['50%', '60%'],
      data: [
        { value: 335, name: 'Direct' },
        { value: 310, name: 'Email' },
        { value: 234, name: 'Ad Networks' },
        { value: 135, name: 'Video Ads' },
        { value: 1548, name: 'Search Engines' },
      ],
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: 'rgba(0, 0, 0, 0.5)',
        },
      },
    },
  ],
});


// Configuração que ativará automaticamente o range picker

const rangeConfig = {
    noDisabledRange: false,
    showLastInRange: false,
    minMaxRawRange: false,
    partialRange: false,
    disableTimeRangeValidation: false,
    fixedStart: false,
    fixedEnd: false,
    maxRange: undefined, 
    minRange: undefined, 
    autoRange: undefined 
};

const data = ref(null);
const error = ref(null); 

const date = ref();
const selectedDate = ref(null);


async function initialTempApi() {
  try {
    data.value = await tempApi({});
  } catch (err) {
    error.value = err.message || 'Ocorreu um erro ao obter os dados da API';
  }
}

// Define um valor inicial para date ao montar o componente
onMounted(() => {
  const startDate = new Date();
  const endDate = new Date(new Date().setDate(startDate.getDate() + 13));
  date.value = [startDate, endDate];
  console.log(date.value)
})

// Função para lidar com a seleção de data no VueDatePicker
async function  handleDateSelection(date) {
  try {   
    selectedDate.value = date
    initialTempApi();
    console.log(selectedDate.value)
  } catch (err) {
    error.value = err.message || 'Ocorreu um erro ao obter os dados';
  }
}


// Filtra os dados para exibir apenas os valores correspondentes ao selectedDate
const filteredData = ref([]);

watch(data, () => {
  if (data.value && selectedDate.value) {
    filteredData.value = (data.value.hourly.time).filter(item => {
      // Converte os valores de data para a mesma data do selectedDate
      const itemDate = new Date(item);
      const startDate = new Date(selectedDate.value[0]);
      const endDate = new Date(selectedDate.value[1]);
      return itemDate >= startDate && itemDate <= endDate;
    });
  }
});

initialTempApi();


</script>

<template>
  <main>
    <div class="wind">
    <h1 class="mt-10 mb-5 font-bold text-lg">Selecione uma período (máximo 14 dias):</h1>
    
    <VueDatePicker 
      v-model="date" 
      :range="{ partialRange: false }"  
      @internal-model-change="handleDateSelection"
      auto-apply 
    />

    <h1 class="mt-10 mb-10 font-bold text-lg">Gráfico de Temperatura</h1>
    <v-chart class="chart" :option="option" autoresize />

    <h1 class="mt-10 mb-10 font-bold text-lg">Tabela</h1>

    <table class="table-fixed ml-auto mr-auto" v-if="data">
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
        <tr v-for="(item, index) in filteredData" :key="index">

          <td class="p-4 text-center border-2">{{formatDate(item)}}</td>

          <!--  verificar se os dados estão definidos -->
          <td class="p-4 text-center border-2" v-if="data.hourly.temperature2m[index]">{{ data.hourly.temperature2m[index].toFixed(1) }}</td>
          <td v-else>N/A</td> <!-- Se não estiver definido, exiba N/A -->

          <td class="p-4 text-center border-2" v-if="data.hourly.apparentTemperature[index]">{{ data.hourly.apparentTemperature[index].toFixed(1) }}</td>
          <td v-else>N/A</td> 

        </tr>  
      </tbody>
    </table>

  </div>  
  </main>
</template>

<style scoped>
.chart {
  height: 100vh;
}
</style>
