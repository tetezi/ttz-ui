<template>
    <DatePicker v-model="value"   @change="change" type="datetime" :min="dayjs()" defaultTime="00:00:10">
    </DatePicker>
</template>
<script lang="tsx" setup>
import { ref } from 'vue'
import { DatePicker } from '@/components'
import dayjs from 'dayjs';
const value = ref()
function change(v) {
    console.log('Slider触发change事件', v)
} 
</script>