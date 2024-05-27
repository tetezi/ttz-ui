<template>
    <div>
        <ItemRender />

    </div>
</template>
<script lang="tsx" setup generic="ExtraRenderParams extends Recordable= Recordable">

import type { FormItemProps, } from './types';
import { useRules, checkSchemaCategory, useContainerCategory, useDisplayCategory, useInputCategory } from './hooks';
import type { Recordable } from '@/global';
import { ref, useAttrs, type ComponentPublicInstance, } from 'vue';
const props = withDefaults(defineProps<FormItemProps<ExtraRenderParams>>(), {
    extraRenderParams: () => ({} as ExtraRenderParams)
})
const emit = defineEmits<{
    formItemInstanceReady: [key: string, el: ComponentPublicInstance]
}>()   
/**
* 表单子项渲染函数
*/
function ItemRender() {
    const { schema } = props
    if (checkSchemaCategory(schema, 'Container')) {

        const { ifShowOfDynamic, getContent, getDynamicConfig } = useContainerCategory(schema, props, emit)
        return ifShowOfDynamic ? <div style={getDynamicConfig(schema.formItemStyle)}>{getContent()}</div> : null
    } else if (checkSchemaCategory(schema, 'Display')) {
        const { ifShowOfDynamic, getContent, getDynamicConfig } = useDisplayCategory(schema, props, emit)
        return ifShowOfDynamic ? <div style={getDynamicConfig(schema.formItemStyle)}>{getContent()}</div> : null
    } else if (checkSchemaCategory(schema, 'Input')) {
        const { ifShowOfDynamic, getContent, getDynamicConfig } = useInputCategory(schema, props, emit)
        const { labelWidth, field, labelShow = true, labelRender, label, schemaKey } = schema;
        const actLabelShow = getDynamicConfig(labelShow)
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
        return ifShowOfDynamic ?
            (<div > <el-form-item {...elFormItemProps} style='margin: 0'>
                {{
                    default: () => getContent(),
                    label: labelVnode,
                }}
            </el-form-item> </div>


            ) : <div></div>;
    } else {
        return <div></div>
    }
} 
</script>