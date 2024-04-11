<template>
    <Input v-model="value" @change="change">
        <template #suffix>元</template>
    </Input>
</template>
<script lang="tsx" setup>
import { ref } from 'vue'
import { Input } from '@/components'
const value = ref()
function change(v) {
    console.log('input触发change事件', v)
}
</script>