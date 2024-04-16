<template>
    <el-table v-bind="tableBind" v-loading="loadingRef">
        <BasicTableColumn v-for="item of  toValue(getProps.columns)" :key="item.columnKey ?? item.prop" v-bind="item">
        </BasicTableColumn>
    </el-table>
</template>
<script lang="ts" setup generic="Data extends Recordable">
import type { TableProps, TableShortEvent, TableMethods } from './types'
import { defaultTableProps } from './defaultProps';
import { getInheritanceEvent, useLocalModel, useLocalProps } from '@/utils';
import { computed, onMounted, toValue, unref } from 'vue';
import { omit } from 'lodash';
const props = withDefaults(defineProps<TableProps<Data>>(), defaultTableProps)
const modelValue = defineModel<Data[]>({
    default: () => ([])
}) 
const emit = defineEmits<TableShortEvent<Data>>()
const { getProps, setProps, emitEvent } = useLocalProps<TableProps<Data>, TableShortEvent<Data>>(props, emit)
const { localModelValue, setModelValue, getModelValue, getFieldsValue, setFieldsValue } = useLocalModel(modelValue)
const slots = defineSlots()

const loadingRef = computed(() => unref(getProps).loading ?? false)
const tableBind = computed(() => {
    return {
        data: unref(localModelValue),
        highlightCurrentRow: false,
        ...omit(unref(getProps), ['loading', 'columns']),
        ...getInheritanceEvent(emitEvent, []),
    }
})
const tableMethods: TableMethods<Data> = {
    getProps,
    setProps, setModelValue, getModelValue, getFieldsValue, setFieldsValue
}
onMounted(() => {
    emitEvent('register', tableMethods)
})  
</script>