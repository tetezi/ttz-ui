<template>
    <el-form ref="elFormInstanceRef" :model="getModelValue" :labelWidth="getProps.labelWidth">
        <!-- <el-row v-bind="getProps.rowProps"> -->
            <template v-for="schema of getFormSchemas" :key="schema.schemaKey">
                <FormItem :schema="(schema)" :formModel="getModelValue" :setFieldsValue="setFieldsValue"
                      :getSlot="(slot, data) => getSlot(slots, slot, data)"
                    :ref="(el) => setFormItemInstanceRef(schema.schemaKey, el as any)">
                </FormItem>
            </template>
        <!-- </el-row> -->
    </el-form>
</template>
<script lang="ts" setup>
import type { FormProps, FormShortEvent } from './types'
import defaultProps from './defaultProps';
import { useData, useFormSchemas, useElFormInstance, useSubmit } from './hooks';
import FormItem from './FormItem.vue'
import { getSlot, useLocalProps } from '@/utils';
import { onMounted } from 'vue';
import type { FormMethods } from './types';
const props = withDefaults(defineProps<Partial<FormProps>>(), defaultProps)
const emit = defineEmits<FormShortEvent>()
const modelValue = defineModel<Recordable>()
const slots = defineSlots()
/**
 * 表单配置
 */
const { getProps, setProps, emitEvent } = useLocalProps<FormProps, FormShortEvent>(props, emit)
/**
 * 表单数据
 */
const { getFieldsValue, setFieldsValue, setModelValue, getModelValue } = useData(getProps, emitEvent, modelValue)
/**
 * 表单子项配置
 */
const { getFormSchemas } = useFormSchemas(getProps, {
    setModelValue,
    getModelValue
})
/**
 * 表单实例操作
*/
const { elFormInstanceRef, getElFormInstance, validate, setFormItemInstanceRef, getFormItemInstance } = useElFormInstance()
/**
 * 表单提交
 */
const { submitLoadingRef, submitFunction } = useSubmit(getProps, emitEvent, validate, getModelValue)

const formMethods: FormMethods = {
    setProps, getProps,
    getModelValue, setModelValue, setFieldsValue, getFieldsValue, validate, submitFunction
}
onMounted(() => {
    emitEvent('register', formMethods)
})  
</script>