<template>
    <el-table v-bind="tableBind" v-loading="loadingRef">
        <BasicTableColumn v-for="item of  getProps.columns" :key="item.columnKey ?? item.prop" v-bind="item">
        </BasicTableColumn>
    </el-table>
</template>
<script lang="ts" setup generic="Data extends Recordable">
import type { TableProps, TableShortEvent, TableMethods } from './types'
import { defaultTableProps } from './defaultProps';
// import { } from './hooks';
import { getInheritanceEvent, getSlot, useLocalProps } from '@/utils';
import { computed, onMounted, toValue, unref } from 'vue';
import { omit } from 'lodash';
const props = withDefaults(defineProps<Partial<TableProps<Data>>>(), defaultTableProps)
const emit = defineEmits<TableShortEvent>()
const { getProps, setProps, emitEvent } = useLocalProps<TableProps<Data>, TableShortEvent>(props, emit)
const modelValue = defineModel<Data[]>({
    default: () => ([])
})
const slots = defineSlots()
const loadingRef = computed(() => unref(getProps).loading ?? false)
const tableBind = computed(() => {
    return {
        data: unref(modelValue),
        highlightCurrentRow: false,
        // currentRowKey: unref(getProps).rowKey ?? "_key",
        ...omit(unref(getProps), ['loading', 'columns']),
        ...getInheritanceEvent(emit, []),
    }
})
const tableMethods: TableMethods = {
}
onMounted(() => {
    emitEvent('register', tableMethods)
})  
</script>