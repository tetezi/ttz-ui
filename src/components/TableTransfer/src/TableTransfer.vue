<template>
    <div style="display: flex;height: 100%;">
        <TableComp style="flex:3;height:100%"></TableComp>
        <div style="display: flex;flex-direction: column;justify-content: center;align-items: center;">
            <BasicButton :func="add" icon="ArrowRightBold"></BasicButton>
            <BasicButton :func="remove" icon="ArrowLeftBold" style="margin-left:0"></BasicButton>
        </div>
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

const [TableComp, tableMethods] = useTable({
    rowKey:props.rowKey,
    title: unref(getProps).title,
    api: unref(getProps).api,
    selectType: 'Check',
    columns: unref(getProps).columns,
})
function getSelectRowIndex(row) {
    return unref(getModelValue).findIndex((val) => {
        const { rowKey } = unref(getProps)
        if (rowKey) {
            return get(val, rowKey) === get(row, rowKey)
        } else {
            return val === row
        }
    })
}
const [TableCompOfSelect, tableOfSelectMethods] = useTable({
    selectType: 'Check',
    title: () => `当前已选择${unref(getModelValue).length}条记录`,
    rowKey:props.rowKey,
    // headerActionRender: () => <BasicButton func={() => setModelValue([])}>清空选择</BasicButton>,
    columns: unref(getProps).columns,
    pageConfigs: false,
})
function add() {
    const rows = unref(tableMethods.getSelectRows)
    rows.forEach((row) => {
        const index = getSelectRowIndex(row)
        if (index === -1) {
            localModelValue.value?.unshift(row)
        }
    })
    tableMethods.clearSelectRows()
}
function remove() {
    const rows = unref(tableOfSelectMethods.getSelectRows)
    rows.forEach((row) => {
        const index = getSelectRowIndex(row)
        localModelValue.value?.splice(index, 1)
    })
    tableOfSelectMethods.clearSelectRows()
}
</script>
<style>
/* .el-table .selectRow {
    background-color: #CDCDCD !important;
}
 
.el-table--enable-row-hover .el-table__body tr.selectRow:hover > td.el-table__cell {

    background-color: #CDCDCD  !important;
} */
</style>