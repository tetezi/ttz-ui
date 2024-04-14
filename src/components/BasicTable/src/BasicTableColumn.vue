<template>
    <el-table-column v-bind="tableColumnBind">
        <template v-if="props.childrenColumns.length > 0">
            <BasicTableColumn v-for="item in props.childrenColumns" v-bind="item" :key="item.columnKey"></BasicTableColumn>
        </template>
    </el-table-column>
</template>
<script lang="ts" setup  generic="Data extends Recordable">
import { omit } from 'lodash';
import { computed, unref } from 'vue';
import type { TableColumnProps } from './types';
import { defaultTableColumnProps } from './defaultProps';
const props = withDefaults(defineProps<TableColumnProps<Data>>(), defaultTableColumnProps)
const tableColumnBind = computed<any>(() => {
    return {
        columnKey: props.columnKey ?? props.prop,
        formatter: props.formatter ? (row: any, column: any, cellValue: any, index: number) => {
            return props.formatter?.(row, cellValue, index, column)
        } : undefined,
        ...omit(props, ['columnKey', 'childrenColumns', 'formatter']),
    }
}) 
</script>