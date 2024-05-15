<template>
    <ItemRender style="margin:8px"/>
</template>
<script lang="tsx" setup>
import { unref, type VNodeChild, } from 'vue';
import type { FormItemProps, FormSchema } from './types';
import { useRules, checkSchemaCategory, useContainerCategory, useDisplayCategory, useInputCategory } from './hooks';
const props = defineProps<FormItemProps>()

/**
* 表单子项渲染函数
*/
function ItemRender() {
    const schema = (props).schema

    if (checkSchemaCategory(schema, 'Container')) {
        const { ifShowOfDynamic, getContent } = useContainerCategory(schema, props)
        return ifShowOfDynamic ? getContent() : null
    } else if (checkSchemaCategory(schema, 'Display')) {
        const { ifShowOfDynamic, getContent } = useDisplayCategory(schema, props)
        return ifShowOfDynamic ? getContent() : null
    } else if (checkSchemaCategory(schema, 'Input')) {
        const { ifShowOfDynamic, getContent, getDynamicConfig } = useInputCategory(schema, props)
        const { labelWidth, field, labelShow = true, labelRender, label, schemaKey } = schema;
        const labelVnode = getDynamicConfig(labelShow)
            ? () => getDynamicConfig(labelRender || label)
            : undefined;
        const rules = useRules();
        const elFormItemProps = {
            rules: rules,
            labelWidth: labelWidth,
            prop: field,
            key: schemaKey,
        };
        return ifShowOfDynamic ? (
            <el-form-item {...elFormItemProps} style='margin:0'>
                {{
                    default: () => getContent(),
                    label: labelVnode,
                }}
            </el-form-item>
        ) : null;
    } else {
        return null
    }

}
</script>