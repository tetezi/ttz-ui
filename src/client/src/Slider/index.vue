<template>
    <Slider v-model="value"  range   @change="change">
    </Slider>
</template>
<script lang="tsx" setup>
import { ref } from 'vue'
import { Slider } from '@/components'
const value = ref([5,4])
function change(v) {
    console.log('Slider触发change事件', v)
}
</script>