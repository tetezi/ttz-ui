<template>
    <component :is='render'></component>
</template>
<script lang="tsx" setup generic="ExtraRenderParams extends Recordable= Recordable">
import Draggable from 'vuedraggable'
import FormItem from './FormItem.vue'
import type { DesignFormSchema, FormItemGroupProps, FormItemProps, FormSchemas, JavaScriptCode } from './types';
import type { Flatten, Recordable } from '@/global';
import { get, isUndefined, pick } from 'lodash';
import { computed, getCurrentInstance, inject, unref, withModifiers, type ComponentInstance, type ComponentPublicInstance, } from 'vue';
import { getInheritanceEvent } from '@/utils';

const props = defineProps<FormItemGroupProps<ExtraRenderParams>>()
const emit = defineEmits<{
    formItemInstanceReady: [key: string, el: ComponentPublicInstance]
}>()
// const isDesign = inject("isDesign", false);
// const isDesignFormSchema = inject("isDesignFormSchema", false);
type WithoutUndefined<T> = T extends undefined ? never : T;
type GetJavaScriptCodeKey = WithoutUndefined<{
    [K in keyof DesignFormSchema]: DesignFormSchema[K] extends (JavaScriptCode<any> | undefined) ? K : never;
}[keyof DesignFormSchema]>;
type Schema = FormItemProps<ExtraRenderParams>['schema'] & {
    schemaKey: string
}

function transitionDesignFormSchema(schema: DesignFormSchema): Schema {
    function getJSCodeToDynamicConfig<K extends GetJavaScriptCodeKey>(configKey: K, defaultValue) {
        const config = schema[configKey]
        if (config) {
            if (config.type === 'value') {
                return config.value ?? defaultValue
            } else if (config.type === 'code') {
                const JSCode = config.code
                if (JSCode) {
                    return (renderParams) => {
                        let result = defaultValue
                        try {
                            const func = new Function('renderParams', JSCode)
                            result = func.call({}, renderParams)
                        } catch (error) {
                            console.error(`JSCode运行异常:${(error as ReferenceError).message}`, {
                                rawError: error, config, schema, configKey
                            })
                        }
                        return result
                    }
                } else {
                    return defaultValue
                }
            }
        } else {
            return defaultValue
        }
    }
    const reulust = {
        schemaKey: schema.schemaKey,
        ifShow: getJSCodeToDynamicConfig('ifShow', true),
        label: getJSCodeToDynamicConfig('label', ''),
        labelRender: getJSCodeToDynamicConfig('labelRender', undefined),
        labelShow: getJSCodeToDynamicConfig('labelShow', true),
        labelWidth: getJSCodeToDynamicConfig('labelWidth', undefined),
        field: schema.field,
        category: schema.category,
        component: schema.component,
        draggableTag: schema.draggableTag,
        children: (schema.children || []),
        componentProps: getJSCodeToDynamicConfig('componentProps', {}),
        componentStyle: getJSCodeToDynamicConfig('componentStyle', {}),
        render: getJSCodeToDynamicConfig('render', undefined),
        componentSlot: getJSCodeToDynamicConfig('componentSlot', undefined),
        colProps: schema.colProps,
    } as Schema
    return reulust
}
function getFormItem(raw: DesignFormSchema | Flatten<FormSchemas<ExtraRenderParams>>) {
    let schema = (props.isDesignFormSchema ? transitionDesignFormSchema(raw as DesignFormSchema) : raw) as Flatten<FormSchemas<ExtraRenderParams>>
    const formItemProps = { schema, ...pick(props, ['formModel', 'setFieldsValue', 'getSlot', 'extraRenderParams']) }
    // const { getDynamicConfig } = useDynamicConfig(formItemProps)
    const colProps = schema.colProps
    const bind = {
        style: {
            padding: '5px',
            outline: props.extraRenderParams?.isSelectedSchema(schema.schemaKey) ? '1px dashed black' : '',
        },
        onClick: (props.isDesign) ? withModifiers(() => {
            props.extraRenderParams?.selectSchema?.(schema.schemaKey)
        }, ['stop',]) : undefined,
        // ...getDynamicConfig(schema.formItemProps),
        key: schema.schemaKey,
        isDesign: props.isDesign,
        isDesignFormSchema: props.isDesignFormSchema,
        ...formItemProps,
        ...getInheritanceEvent(emit, ['formItemInstanceReady']),
    }
    return (isUndefined(colProps) ? <FormItem  {...bind} >   </FormItem> : <el-col {...colProps}><FormItem  {...bind} >   </FormItem></el-col>)

}
const render = (() => {
    if (props.isDesign) {
        const draggableBind = {
            modelValue: props.formSchemas,
            'onUpdate:modelValue': (v) => {
                props.extraRenderParams?.setSchemas?.(v, props.parentSchema?.schemaKey)
            },
            tag: props.parentSchema?.category === 'Container' ? props.parentSchema.draggableTag : undefined,
            itemKey: 'schemaKey',
            group: 'formSchemas',
            style: {
                height: '100%',
                width: '100%'
            }
        }
        return <Draggable  {...draggableBind}>
            {{
                item: ({ element }) => {
                    return getFormItem(element)
                }
            }}
        </Draggable>
    } else {
        return props.formSchemas.map(getFormItem)

    }
}) 
</script>
<style scoped>
/* :deep(.selectedSchame) {
    border: 1px solid yellow !important;
} */
</style>