<template>
    <el-button @click='www'>www</el-button>
    {{ modelValue }}
    <TableVNode v-model="modelValue"  >
    </TableVNode>
</template>
<script lang="tsx" setup>
import { reactive, ref, unref } from 'vue'
import { BasicTable, useTable, } from '@/components' 
import { buildUUID, getInheritanceEvent, getSlot, useLocalModel, useLocalProps } from '@/utils';
import { omit, set } from 'lodash';
const [TableVNode] = useTable({
    columns: [
        {
            label: 'aa',
            childrenColumns: [
                { prop: 'aa', label: 'aa', formatter: ({ bb }) => <div>ww</div> },
                { prop: 'bb', label: 'bb' }
            ]
        }, { prop: 'bb', label: 'bb' }
    ]
})
const modelValue = reactive([{ aa: 'aa', bb: 'bb' }, { aa: 'aa1', bb: 'bb1' }, { aa: 'aa2', bb: 'bb2' },])
const setFieldsValue = function (
    key: any,
    value: any
) {
    set(unref(modelValue), key, value);
};
function www() {
    setFieldsValue('0.bb', buildUUID())
}
</script>