<template>
    <el-button @click='www'>www</el-button>
    {{ modelValue }}
    <TableComponent v-model="modelValue"> </TableComponent> 
</template>
<script lang="tsx" setup>
import { defineComponent, reactive, ref, unref } from 'vue'
import { BasicTable, useTable, } from '@/components'
import { buildUUID, getInheritanceEvent, getSlot, useLocalModel, useLocalProps } from '@/utils';
import { omit, set } from 'lodash';
const columns = [
    {
        label: 'aa',
        childrenColumns: [
            { prop: 'aa', label: 'aa', formatter: ({ bb }) => <div>ww</div> },
            { prop: 'bb', label: 'bb' }
        ]
    }, { prop: 'bb', label: 'bb' }
]
const [TableComponent] = useTable({
    columns
}) 
const modelValue = ref()
function www() {
    modelValue.value = [{}]
} 
</script>