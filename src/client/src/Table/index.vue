<template>
    <el-button @click='www'>www</el-button>
    {{ modelValue }}
    <BasicTable v-model="modelValue" :columns="columns">
    </BasicTable>
</template>
<script lang="tsx" setup>
import { reactive, ref, unref } from 'vue'
import { BasicTable, } from '@/components'
import type { TableColumnProps } from '@/components';
import { buildUUID, getInheritanceEvent, getSlot, useLocalModel, useLocalProps } from '@/utils';
import { omit, set } from 'lodash';
const modelValue = reactive([{ aa: 'aa', bb: 'bb' }, { aa: 'aa1', bb: 'bb1' }, { aa: 'aa2', bb: 'bb2' },])
const columns: TableColumnProps<any>[] = [
    {
        label: 'aa',
        childrenColumns: [
            { prop: 'aa', label: 'aa', formatter: ({ bb }) => <div>ww</div> },
            { prop: 'bb', label: 'bb' }
        ]
    }, { prop: 'bb', label: 'bb' }
]
const setFieldsValue = function (
    key: any,
    value: any
) {
    console.log(444,unref(modelValue))
    set(unref(modelValue), key, value);
    console.log(444,unref(modelValue))
};
function www() {
    setFieldsValue('0.bb', buildUUID())
}
</script>