<template>
    <div v-if="ifShowOfDynamic" :key="props.schema.schemaKey">
        <ItemRender />
    </div>
</template>
<script lang="tsx" setup generic="ExtraRenderParams extends Recordable= Recordable">

import type { FormItemProps, } from './types';
import { useRules, useFormItem } from './hooks';
import type { Recordable } from '@/global';
import { computed, unref, type ComponentPublicInstance, } from 'vue';
import { isFunction } from 'lodash';
const props = withDefaults(defineProps<FormItemProps<ExtraRenderParams>>(), {
    extraRenderParams: () => ({} as ExtraRenderParams)
})
const emit = defineEmits<{
    formItemInstanceReady: [key: string, el: ComponentPublicInstance]
}>()

const { ifShowOfDynamic, labelVNodeOfDynamic, labelShowOfDynamic, getContent, } = useFormItem(props, emit)


const ItemRender = (() => {
    if (props.schema.category === 'Input') {
        const { labelWidth, field, schemaKey } = props.schema;
        const rules = useRules();
        const elFormItemProps = {
            rules: rules,
            labelWidth: unref(labelShowOfDynamic) ? labelWidth : '0px',
            prop: field,
            key: schemaKey,
        };
        return <el-form-item {...elFormItemProps} style='margin: 0'>
            {{
                default: () => {
                    return (getContent)()
                },
                label: unref(labelShowOfDynamic)?() => {
                    return unref(labelVNodeOfDynamic)
                }:undefined,
            }}
        </el-form-item>
    } else {

        return (getContent)()
    }
}) 
</script>