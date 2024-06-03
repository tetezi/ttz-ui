<template>
    <el-form ref="elFormInstanceRef" :model="getModelValue" :labelWidth="getProps.labelWidth">
        <FormItemGroup :formSchemas="getProps.formSchemas" :isDesign :formModel="getModelValue"
            :setFieldsValue="setFieldsValue" :getSlot="(slot, data) => getSlot(slots, slot, data)"
            :extraRenderParams="formMethods" @formItemInstanceReady="setFormItemInstanceRef"> </FormItemGroup>
    </el-form>
</template>
<script lang="ts" setup>
import type { FormProps, FormShortEvent } from './types'
import defaultProps from './defaultProps';
import { useElFormInstance, useFormSchemas, useSubmit, } from './hooks';
import FormItemGroup from './FormItemGroup.vue'
import { getSlot, useLocalModel, useLocalProps } from '@/utils';
import { onMounted, unref, watch, provide, computed, getCurrentInstance, } from 'vue';
import type { FormMethods } from './types';
import type { Recordable } from '@/global';
const props = withDefaults(defineProps<Partial<FormProps>>(), defaultProps)
const emit = defineEmits<FormShortEvent>()
const modelValue = defineModel<Recordable>()
const slots = defineSlots()
const isDesign = computed(() => unref(getProps).isDesign)
const isDesignFormSchema = computed(() => unref(getProps).isDesignFormSchema)

/**
 * 表单配置
 */
const { getProps, setProps, emitEvent } = useLocalProps<FormProps, FormShortEvent, typeof defaultProps>(props, emit)

/**
 * 表单数据
 */
const { setFieldsValue, getFieldsValue, getModelValue, setModelValue } = useLocalModel(modelValue, () => ({}));
watch(
    getModelValue,
    (val) => {
        emitEvent("change", val);
    },
    {
        deep: true,
    }
);

/**
 * 表单子项配置
 */

const { updateSchema, getSchema, setSchemas, isSelectedSchema, unSelectSchema, selectSchema } = useFormSchemas(getProps, setProps, emitEvent)
/**
 * 表单实例操作
*/
const { elFormInstanceRef, getElFormInstance, validate, setFormItemInstanceRef, getFormItemInstance } = useElFormInstance()
/**
 * 表单提交
 */
const { getSubmitLoading, submitFunction } = useSubmit(getProps, emitEvent, validate, getModelValue)

function initDefaultValue() {
    setModelValue(unref(getProps).defaultValue)
}
const formMethods: FormMethods = {
    setProps, getProps,
    getModelValue,
    setModelValue, setFieldsValue, getFieldsValue, validate, submitFunction, getSubmitLoading, initDefaultValue,
    updateSchema, getSchema, setSchemas, selectSchema, isSelectedSchema, getFormItemInstance
}
provide('isDesign', isDesign)
provide('isDesignFormSchema', isDesignFormSchema)
onMounted(() => {
    emitEvent('register', formMethods)
    const rawProps = getCurrentInstance()!.vnode!.props;
    if (!(rawProps && 'modelValue' in rawProps)) {
        initDefaultValue()
    }
})   
</script>