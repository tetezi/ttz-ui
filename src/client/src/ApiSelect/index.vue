<template>
    <el-input v-model='params.text'> </el-input>
    {{ value }}
    <ApiSelect v-model="value" :api="api" :params="params" valueField="id" labelField="name" @init="init"></ApiSelect>
</template>
<script lang="ts" setup>
import { ref, } from 'vue'
import { ApiSelect } from '@/components'
import type { Recordable } from '@/global';
const value = ref()
const params = ref({ text: '' })
async function api(params: Recordable) {
    return [
        { name: '测试', id: 'cs' }
    ]
}
function init() {
    console.log('初始化')
}
</script>