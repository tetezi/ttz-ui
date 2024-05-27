<template>
    <div v-if="ifShowOfDynamic" :style="formItemStyleOfDynamic" :key="props.schema.schemaKey">
        <ItemRender />
    </div>
</template>
<script lang="tsx" setup generic="ExtraRenderParams extends Recordable= Recordable">

import type { FormItemProps, } from './types';
import { useRules, useFormItem } from './hooks';
import type { Recordable } from '@/global';
import { computed, type ComponentPublicInstance, } from 'vue';
const props = withDefaults(defineProps<FormItemProps<ExtraRenderParams>>(), {
    extraRenderParams: () => ({} as ExtraRenderParams)
})
const emit = defineEmits<{
    formItemInstanceReady: [key: string, el: ComponentPublicInstance]
}>()

const { getDynamicConfig, getContent, } = useFormItem(props, emit)

const ifShowOfDynamic = computed(() => getDynamicConfig(props.schema.ifShow ?? true))
const formItemStyleOfDynamic = computed(() => getDynamicConfig(props.schema.formItemStyle))
const ItemRender = computed(() => {
    if (props.schema.category === 'Input') {
        const { labelWidth, field, labelShow, labelRender, label, schemaKey } = props.schema;
        const actLabelShow = getDynamicConfig(labelShow ?? true)
        const labelVnode = actLabelShow
            ? () => getDynamicConfig(labelRender || label)
            : undefined;
        const rules = useRules();
        const elFormItemProps = {
            rules: rules,
            labelWidth: actLabelShow ? labelWidth : '0px',
            prop: field,
            key: schemaKey,
        };
        return <el-form-item {...elFormItemProps} style='margin: 0'>
            {{
                default: () => (getContent)(),
                label: labelVnode,
            }}
        </el-form-item>
    } else {

        return (getContent)()
    }
}) 
</script>