<template>
    <el-form :model="localModelValue" label-width="0px">
        <TableVNode v-model="localModelValue">
        </TableVNode>
    </el-form>
</template>
<script lang="tsx" setup generic="Data extends Recordable">
import { computed, unref } from 'vue';
import { isFunction, omit } from 'lodash'
import type { EditableTableProps, EditableTableRednerParams, EditableTableShortEvent } from './types'
import { editableTableDefaultProps } from './defaultProps';
import { buildUUID, getInheritanceEvent, getSlot, useLocalModel, useLocalProps } from '@/utils';
import { useTable } from '@/components/BasicTable';
import { toValue } from 'vue';
import { FormItem, type FormSchema } from '@/components/BasicForm';
const props = withDefaults(defineProps<EditableTableProps<Data>>(), editableTableDefaultProps)
const emit = defineEmits<EditableTableShortEvent<Data>>()
const modelValue = defineModel<Data[]>()
const { getProps, setProps, emitEvent } = useLocalProps(props, emit)
const { localModelValue, setFieldsValue, setModelValue, getFieldsValue, getModelValue } = useLocalModel(modelValue)
const slots = defineSlots()

const [TableVNode] = useTable(() => {
    console.log(unref(props).columns)
    console.log(toValue(unref(getProps).columns))
    return {
        columns: toValue(unref(getProps).columns).map((column) => {
            return {
                ...column,
                label: column.label,
                renderHeader: () => {
                    return <div>
                        <span>{column.label}</span>
                        {/* {column.required === true ? <span style={{ color: 'rgb(245,108,108)', marginLeft: '4px' }}>*</span> : ''} */}
                    </div>
                },
                formatter: (row, cellValue, index) => {
                    const renderParams: EditableTableRednerParams<Data> = {
                        row: row as Partial<Data>,
                        cellValue,
                        index: index as number,
                        setRowValue: (value: Partial<Data>) => {
                            setFieldsValue(index as number, value)
                        },
                        setRowFieldValue: (key: keyof Data, value: any) => {
                            setFieldsValue([index as number, key], value)
                        }
                    }
                    const { editConfig, hide = false } = column
                    const isHide = isFunction(hide) ? hide(renderParams) : hide
                    if (isHide) {
                        return '-'
                    } else if (editConfig) {
                        let actialEditConfig = isFunction(editConfig) ? editConfig(renderParams) : editConfig
                        const schema = {
                            ...actialEditConfig,
                            field: [index, column.prop],
                            label: `第${Number(index) + 1}行的${column.label}`,
                            labelShow: false,
                            labelWidth: 0,
                            category: actialEditConfig.category ?? "Input",
                            schemaKey: actialEditConfig.schemaKey ??  ([index, column.prop]).join('-') ?? buildUUID(),
                        } as FormSchema<any>


                        return <FormItem schema={schema} formModel={unref(getModelValue)} setFieldsValue={setFieldsValue}
                            getSlot={(slot, data) => getSlot(slots, slot, data)}>
                        </FormItem>
                    } else {
                        return column.formatter ? column.formatter?.(row, cellValue, index, column) : cellValue
                    }
                }
            }
        }),
    }
})
</script>