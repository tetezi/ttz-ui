<template>
    <div style="height: 100%; display: flex;flex-direction: column;background-color: #FFFFFF;">

        <component :is="getHeaderVNode"></component>
        <el-table style="flex:1" v-bind="tableBind" v-loading="loadingRef">
            <BasicTableColumn v-for="item of  toValue(getProps.columns)" :key="item.columnKey ?? item.prop"
                v-bind="item">
            </BasicTableColumn>
            <BasicTableColumn v-if="actionColumn" v-bind="actionColumn">
            </BasicTableColumn>
        </el-table>
        <GetPaginationVNode style="flex:0;padding:5px 10px;border: 1px solid rgb(235,238,245)"></GetPaginationVNode>
    </div>

</template>
<script lang="ts" setup generic="Data extends Recordable">
import type { TableProps, TableShortEvent, TableMethods, TableColumn } from './types'
import { defaultTableProps } from './defaultProps';
import { getInheritanceEvent, useLocalModel, useLocalProps } from '@/utils';
import { computed, onMounted, toValue, unref } from 'vue';
import { isFunction, omit } from 'lodash';
import type { Recordable } from '@/global';
import { usePage, useTableApi, useTableHeader } from './hooks';
const slots = defineSlots()
const props = withDefaults(defineProps<TableProps<Data>>(), defaultTableProps)
const modelValue = defineModel<Data[]>()
const emit = defineEmits<TableShortEvent<Data>>()
/**
* 本地化组件道具数据
*/
const { getProps, setProps, emitEvent } = useLocalProps<TableProps<Data>, TableShortEvent<Data>, typeof defaultTableProps>(props, emit)
/**
 * 本地化双向绑定数据
 */
const { localModelValue, setModelValue, getModelValue, getFieldsValue, setFieldsValue } = useLocalModel(modelValue, () => [])
/**
 * 分页
 */
const { GetPaginationVNode, getPageData, pageSizeRef, totalRef, currentPageRef, } = usePage(getProps, getModelValue)

const { fetch, reload } = useTableApi(getProps, setProps, setModelValue, { pageSizeRef, currentPageRef, totalRef })

const { getHeaderVNode } = useTableHeader(getProps, reload)
const loadingRef = computed(() => unref(getProps).loading ?? false)
const tableBind = computed(() => {
    return {
        data: unref(getPageData),
        highlightCurrentRow: false,
        ...omit(unref(getProps), ['loading', 'columns', 'actionColumn']),
        ...getInheritanceEvent(emitEvent, []),
    }
})
const actionColumn = computed<undefined | TableColumn<Data>>(() => {
    const action = unref(getProps).actionColumn
    return action ? ({
        label: '操作', prop: '_action', fixed: 'right', align: 'center', width: 120,
        ...(isFunction(action) ? { formatter: action } : action)
    }) : undefined
})
const tableMethods: TableMethods<Data> = {
    getProps,
    setProps, setModelValue, getModelValue, getFieldsValue, setFieldsValue, fetch, reload
}
onMounted(() => {
    emitEvent('register', tableMethods)
})  
</script>