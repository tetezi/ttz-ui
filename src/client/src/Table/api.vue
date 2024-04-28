<template>
    {{ modelValue }}
    <TableComponent v-model="modelValue"> </TableComponent>
</template>
<script lang="tsx" setup>
import { defineComponent, reactive, ref, unref } from 'vue'
import { BasicButton, BasicTable, useTable, } from '@/components'
import { buildUUID, getInheritanceEvent, getSlot, useLocalModel, useLocalProps } from '@/utils';
import { omit, set } from 'lodash';
const columns = [

    {
        label: 'aa',
        prop: 'aa',
    }, { prop: 'bb', label: 'bb' }
]
const [TableComponent] = useTable({
    headerActionRender: <BasicButton>asd</BasicButton>,
    columns,
    api: (params) => {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve({
                    rows: [
                        { aa: 1, bb: 1 },
                        { aa: 2, bb: 2 },
                    ],
                    total: 99
                })
            }, 5000);
        })
    },
    immediate: true
})
const modelValue = ref() 
</script>