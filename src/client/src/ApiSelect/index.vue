<template>
    <el-input v-model='params.text'> </el-input>
    <ApiSelect v-model="value" :api="api" :params="params"></ApiSelect>
</template>
<script lang="ts" setup>
import { ref, } from 'vue'
import { ApiSelect } from '@/components'
import type { Recordable } from '@/global';
const value = ref()
const params = ref({ text: '' })
async function api(params: Recordable) {
    console.log('请求参数', params)
    return ''
}
</script>