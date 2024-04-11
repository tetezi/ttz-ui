<template>
    {{ modelValue }}
    <el-form ref="elFormInstanceRef" :model="getFormData" :labelWidth="getProps.labelWidth">
        <el-row v-bind="getProps.rowProps">
            <template v-for="schema of getFormSchemas" :key="schema.schemaKey">
                <FormItem :schema="(schema)" :formModel="getFormData" :setFieldsValue="setFieldsValue"
                    :submitFunction="submitFunction" :baseColProps="getProps.baseColProps"
                    :getSlot="(slot, data) => getSlot(slots, slot, data)"
                    :ref="(el) => setFormItemInstanceRef(schema.schemaKey, el as any)">
                </FormItem>
            </template>
        </el-row>
    </el-form>
</template>
<script lang="ts" setup>
import type { FormProps, FormShortEvent } from './types'
import defaultProps from './defaultProps';
import { useProps, useData, useFormSchemas, useElFormInstance, useSubmit } from './hooks';
import FormItem from './FormItem.vue'
import { getSlot } from '@/utils';
import { ref, unref } from 'vue';
const props = withDefaults(defineProps<Partial<FormProps>>(), defaultProps)
const emit = defineEmits<FormShortEvent>()
const modelValue = defineModel<Recordable>({
    default: () => ({})
})
const slots = defineSlots()
/**
 * 表单配置
 */
const { getProps, setProps, emitEvent } = useProps(props, emit)
/**
 * 表单数据
 */
const { getFieldsValue, setFieldsValue, setFormData, getFormData } = useData(getProps, emitEvent, modelValue)
/**
 * 表单子项配置
 */
const { getFormSchemas } = useFormSchemas(getProps, {
    setFormData,
    getFormData
})
/**
 * 表单实例操作
*/
const { elFormInstanceRef, getElFormInstance, validate, setFormItemInstanceRef, getFormItemInstance } = useElFormInstance()
/**
 * 表单提交
 */
const { submitLoadingRef, submitFunction } = useSubmit(getProps, emitEvent, validate, getFormData)

</script>