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
const props = withDefaults(defineProps<FormItemProps<ExtraRenderParams>>(), {
    extraRenderParams: () => ({} as ExtraRenderParams)
})
const emit = defineEmits<{
    formItemInstanceReady: [key: string, el: ComponentPublicInstance]
}>()

const { ifShowOfDynamic, labelVNodeOfDynamic, labelShowOfDynamic, labelWidthOfDynamic, getContent, } = useFormItem(props, emit)
 
const ItemRender = (() => {
    const { schemaKey } = props.schema;
    if (props.schema.category === 'Input') {
        const { field, } = props.schema;
        const rules = useRules();
        const elFormItemProps = {
            rules: rules,
            labelWidth: unref(labelWidthOfDynamic),
            prop: field,
            key: schemaKey,
        };
        return <el-form-item {...elFormItemProps} style='margin: 0'>
            {{
                default: () => {
                    return   (getContent)()
                },
                label: unref(labelShowOfDynamic) ? () => {
                    return unref(labelVNodeOfDynamic)
                } : undefined,
            }}
        </el-form-item>
    } else {
        return   (getContent)()
    }
}) 
</script>