<template>
    <BasicIcon :color :size icon="FullScreen" ></BasicIcon>
    <BasicIcon :color :size :icon="comp" ></BasicIcon>
    <BasicIcon :color :size :icon="Fullscreen" ></BasicIcon> 
</template>
<script lang="ts" setup> 
import { BasicIcon } from '@/components' 
import { defineComponent } from 'vue';
import Fullscreen from '@/assets/Fullscreen.svg';
const comp = defineComponent({
    render: () => 'asd'
})
const color = 'red'
const size = 40
</script> 