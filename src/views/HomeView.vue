<script setup>
import { ref, onMounted , watch} from 'vue';
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'
import tempApi from '@/stores/tempApi.js';
import formatDate from '@/stores/formatDate.js';

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
    <h1 class="title">Temperatura</h1>
    
    <VueDatePicker 
      v-model="date" 
      :range="{ partialRange: false }"  
      @internal-model-change="handleDateSelection"
      auto-apply 
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
