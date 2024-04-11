<template>
    <Select v-model="value" :options="options" multiple></Select>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
import { Select } from '@/components'
const value = ref()
const options = [
    {label:'asd',value:'asd'},
    {label:'www',value:'ww'},
]
</script>