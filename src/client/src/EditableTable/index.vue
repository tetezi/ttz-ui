<template>
    {{ value }}
    <EditableTable :columns="columns" v-model="value"></EditableTable>
</template>
<script lang="ts" setup>
import { EditableTable } from '@/components'
import type { EditableTableColumn } from '@/components'
import { ref } from 'vue';
const value = ref([{bb:'asd'}])
const columns: EditableTableColumn<any>[] = [
    { prop: 'bb', label: 'bb', editConfig: { component: 'Input' } }
]
</script>