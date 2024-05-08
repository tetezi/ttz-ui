<template>
    <div style="display: flex;height: 100%;">
        <TableComp style="flex:3;height:100%"></TableComp>
        <!-- {{ t }} -->
        <TableCompOfSelect style="flex:2;height:100%" v-model="localModelValue"></TableCompOfSelect>
    </div>
</template>
<script lang="tsx" setup generic="Data extends Recordable">
import { computed, ref, unref, } from 'vue';
import { get, isUndefined, omit } from 'lodash'
import type { TableTransferProps, TableTransferShortEvent } from './types'
import { defaultTableTransferProps } from './defaultProps';
import { buildUUID, getInheritanceEvent, useLocalModel, useLocalProps } from '@/utils';
import type { Recordable } from '@/global';
import { BasicButton, useTable } from '@/components';
const props = withDefaults(defineProps<TableTransferProps<Data>>(), defaultTableTransferProps)
const emit = defineEmits<TableTransferShortEvent<Data>>()
const modelValue = defineModel<Data[]>()
/**
* 本地化组件道具数据
*/
const { getProps, setProps, emitEvent } = useLocalProps<TableTransferProps<Data>, TableTransferShortEvent<Data>, typeof defaultTableTransferProps>(props, emit)
/**
 * 本地化双向绑定数据
 */
const { localModelValue, setModelValue, getModelValue, getFieldsValue, setFieldsValue } = useLocalModel(modelValue, () => [])
const getBind = computed(() => {
    return {
        ...omit(unref(getProps), []),
        ...getInheritanceEvent(emitEvent, []),
    }
})
const [TableComp, tableMethods] = useTable({
    title: unref(getProps).title,
    api: unref(getProps).api,
    headerActionRender: () => <BasicButton func={() => {
        const pageRows = unref(tableMethods.getPageData)
        pageRows.forEach(select)
    }}>全选当前页</BasicButton>,
    columns: unref(getProps).columns,
    rowClassName: ({ row }) => {
        console.log(row, getSelectRowIndex(row) !== -1)
        return getSelectRowIndex(row) !== -1 ? 'selectRow' : ''
    },
    onRowClick: (row) => {
        select(row)
    }
})
function getSelectRowIndex(row) {
    return unref(getModelValue).findIndex((val) => (!isUndefined(get(val, props.idField))) && get(val, props.idField) === get(row, props.idField))
}
const [TableCompOfSelect, tableOfSelectMethods] = useTable({
    title: () => `当前已选择${unref(getModelValue).length}条记录`,
    headerActionRender: () => <BasicButton func={() => setModelValue([])}>清空选择</BasicButton>,
    columns: unref(getProps).columns,
    onRowClick: (row) => {
        unSelect(row)
    }
})
function select(row) {
    if (getSelectRowIndex(row) !== -1) {
    } else {
        // setModelValue([row, ...unref(getModelValue)])
        unref(getModelValue).unshift(row)
    }
}
function unSelect(row) {
    const index = getSelectRowIndex(row)
    if (index !== -1) {
        (unref(getModelValue).splice(index, 1))
    } else {

    }
}
</script>
<style>
.el-table .selectRow {
    background-color: #CDCDCD !important;
}
 
.el-table--enable-row-hover .el-table__body tr.selectRow:hover > td.el-table__cell {

    background-color: #CDCDCD  !important;
}
</style>