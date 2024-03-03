<script setup>
import { ref } from 'vue';
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'


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

const emitDate = () => {
    // Emita o valor da data como um evento chamado 'update:date'
    // Isso permite que o componente pai capture o valor da data
    emit('update:date', date.value);
}

const date = ref();

</script>


<template>
   <VueDatePicker v-model="date" :range="{ partialRange: false }" />
   <ChildComponent :date="date" @update:date="handleDateUpdate" />
</template>