<template>
    <div style="display: flex;height: 100%;width: 100%;">
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
import { watchEffect } from 'vue';
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
    rowKey: props.rowKey,
    title: unref(getProps).title,
    selectType: 'Check',
    columns: unref(getProps).columns,
    disableSelect: (row) => {
        const { rowKey } = props

        return (unref(getModelValue) || []).some((item) => {
            if (rowKey) {
                return get(item, rowKey) === get(row, rowKey)
            } else {
                return item === row
            }
        })

    }
}, () => {
    watchEffect(() => {
        tableMethods.setModelValue(props.unSelectedData)
    })
})
const [TableCompOfSelect, tableOfSelectMethods] = useTable({
    selectType: 'Check',
    title: () => `当前已选择${(unref(getModelValue) || []).length}条记录`,
    rowKey: props.rowKey,
    // headerActionRender: () => <BasicButton func={() => setModelValue([])}>清空选择</BasicButton>,
    columns: unref(getProps).columns,
    pageConfigs: false,

})
function add() {
    const rows = unref(tableMethods.getSelectRows)
    if (isUndefined(unref(localModelValue))) {

        rows.forEach((row) => {
            tableMethods.deleteTableRow(row)
        })
        localModelValue.value = rows
    } else {
        rows.forEach((row) => {
            tableMethods.deleteTableRow(row)
            tableOfSelectMethods.unshiftTableRow(row)
        })
    }

    tableMethods.clearSelectRows()
    emitEvent('add', rows)
}
function remove() {
    const rows = unref(tableOfSelectMethods.getSelectRows)
    rows.forEach((row) => {
        // const index = getSelectRowIndex(row)
        // localModelValue.value?.splice(index, 1)
        tableMethods.unshiftTableRow(row)
        tableOfSelectMethods.deleteTableRow(row)
    })
    emitEvent('remove', rows)
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