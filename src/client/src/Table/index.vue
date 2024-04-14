<template>
    <BasicTable v-model="value" :columns="columns">
    </BasicTable>
</template>
<script lang="tsx" setup>
import { ref } from 'vue'
import { BasicTable, } from '@/components'
import type { TableColumnProps } from '@/components';
const value = ref([{ aa: 'aa', bb: 'bb' }, { aa: 'aa1', bb: 'bb1' }, { aa: 'aa2', bb: 'bb2' },])
const columns: TableColumnProps<any>[] = [
    {
        label: 'aa',
        childrenColumns: [
            { prop: 'aa', label: 'aa', formatter: ({ bb }) => <div>ww</div> },
            { prop: 'bb', label: 'bb' }
        ]
    }, { prop: 'bb', label: 'bb' }
] 
</script>