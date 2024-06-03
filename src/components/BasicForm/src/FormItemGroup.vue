<template>
    <component :is='render'></component>
</template>
<script lang="tsx" setup generic="ExtraRenderParams extends Recordable= Recordable">
import Draggable from 'vuedraggable'
import FormItem from './FormItem.vue'
import type { DesignFormSchema, FormItemGroupProps, FormItemProps, FormSchemas, JavaScriptCode } from './types';
import type { Recordable } from '@/global';
import { get, isUndefined, pick } from 'lodash';
import { computed, inject, unref, withModifiers, type ComponentInstance, type ComponentPublicInstance, } from 'vue';
import { buildUUID, getInheritanceEvent } from '@/utils';
import { useDynamicConfig, } from './hooks';
const props = defineProps<FormItemGroupProps<ExtraRenderParams>>()
const emit = defineEmits<{
    formItemInstanceReady: [key: string, el: ComponentPublicInstance]
}>()
const isDesign = inject("isDesign", false);
const isDesignFormSchema = inject("isDesignFormSchema", false);
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
        schemaKey: schema.id,
        ifShow: getJSCodeToDynamicConfig('ifShow', true),
        label: getJSCodeToDynamicConfig('label', ''),
        labelRender: getJSCodeToDynamicConfig('labelRender', undefined),
        labelShow: getJSCodeToDynamicConfig('labelShow', true),
        labelWidth: getJSCodeToDynamicConfig('labelWidth', undefined),
        field: schema.field,
        category: schema.category,
        component: schema.component,
        children: (schema.children || []),
        componentProps: getJSCodeToDynamicConfig('componentProps', {}),
        componentStyle: getJSCodeToDynamicConfig('componentStyle', {}),
        render: getJSCodeToDynamicConfig('render', undefined),
        componentSlot: getJSCodeToDynamicConfig('componentSlot', undefined),
    } as Schema
    return reulust
}
function getFormItem(raw) {
    let schema = unref(isDesignFormSchema) ? transitionDesignFormSchema(raw) : raw
    const formItemProps = { schema, ...pick(props, ['formModel', 'setFieldsValue', 'getSlot', 'extraRenderParams']) }
    const { getDynamicConfig } = useDynamicConfig(formItemProps)
    const bind = {
        style: {
            padding: '5px',
            outline: props.extraRenderParams?.isSelectedSchema(schema.schemaKey) ? '1px dashed black' : ''
        },
        onclick: unref(isDesign) ? withModifiers(() => {
            props.extraRenderParams?.selectSchema?.(schema.schemaKey)
        }, ['stop',]) : undefined,
        ...getDynamicConfig(schema.formItemProps),
        ...formItemProps,
        ...getInheritanceEvent(emit, ['formItemInstanceReady']),
    }
    return <FormItem  {...bind} >   </FormItem>

}
const formSchemasRef = computed(() => {
    if (!unref(isDesignFormSchema)) {
        return (props.formSchemas || []).map((schema) => {
            return {
                ...schema,
                category: schema.category ?? "Input",
                schemaKey: schema.schemaKey ?? buildUUID()
            }
        })
    } else {
        return props.formSchemas || []
    }
})
const render = (() => {
    if (unref(isDesign)) {
        const draggableBind = {
            modelValue: unref(formSchemasRef),
            'onUpdate:modelValue': (v) => {
                props.extraRenderParams?.setSchemas?.(v, props.parentSchema?.schemaKey)
            },
            itemKey: 'schemaKey',
            group: 'formSchemas',
            style: {
                height: '100%',
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
        return unref(formSchemasRef).map(getFormItem)
    }
}) 
</script>
<style scoped>
/* :deep(.selectedSchame) {
    border: 1px solid yellow !important;
} */
</style>