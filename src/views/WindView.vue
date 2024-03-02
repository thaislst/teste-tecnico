<script setup>
  import { ref, onMounted , watch} from 'vue';
  import VueDatePicker from '@vuepic/vue-datepicker';
  import '@vuepic/vue-datepicker/dist/main.css'
  import windAPI from '@/stores/windAPI'
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

  async function initialWindAPI() {
    try {
      data.value = await windAPI({});
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
    initialWindAPI();
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

  initialWindAPI()
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

    <h1 class="mt-10 mb-10 font-bold text-lg">Vento em Diferentes Níveis - Itajubá, MG</h1>
    <table class="table-fixed" v-if="data">
      <thead>
        <tr class="border-2 bg-comerc-blue text-white">
          <th class="p-4 font-bold ">Data/Hora</th>
          <th class="p-4 font-bold">Vento 10m</th>
          <th class="p-4 font-bold">Vento 80m</th>
          <th class="p-4 font-bold">Vento 120m</th>
          <th class="p-4 font-bold">Vento 180m</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in filteredData" :key="index">
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
