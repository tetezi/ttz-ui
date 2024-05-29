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
import { useDynamicConfig, useRenderParams } from './hooks';
const props = defineProps<FormItemGroupProps<ExtraRenderParams>>()
const emit = defineEmits<{
    formItemInstanceReady: [key: string, el: ComponentPublicInstance]
}>()
const modelValue = defineModel<FormSchemas<ExtraRenderParams>>({ required: true })
const isDesign = inject("isDesign", false);
const isDesignFormSchema = inject("isDesignFormSchema", false);
type WithoutUndefined<T> = T extends undefined ? never : T;
type ExecuteJSCode<T> = T extends JavaScriptCode<(infer R)> ? WithoutUndefined<R> : never
type GetJavaScriptCodeKey = WithoutUndefined<{
    [K in keyof DesignFormSchema]: DesignFormSchema[K] extends (JavaScriptCode<any> | undefined) ? K : never;
}[keyof DesignFormSchema]>;
// const { selectSchema, getSelectedSchema, isSelectedSchema } = useSelectedSchema()
function executeJSCode<K extends GetJavaScriptCodeKey>(schema: DesignFormSchema, configKey: K, defaultValue: ExecuteJSCode<DesignFormSchema[K]>, argObject: Recordable = {}): ExecuteJSCode<DesignFormSchema[K]> {
    const config = get(schema, configKey) as JavaScriptCode<any> | undefined
    if (config) {
        if (config.type === 'value') {
            return config.value
        } else if (config.type === 'code') {
            const JSCode = config.code
            if (isUndefined(JSCode)) {
                return defaultValue
            } else {
                const func = new Function(...Object.keys(argObject), JSCode)
                let result = defaultValue
                try {
                    result = func.call({}, ...Object.values(argObject))
                } catch (error) {
                    console.error(`JSCode运行异常:${(error as ReferenceError).message}`, {
                        rawError: error, config, schema, configKey
                    })
                }
                return result
            }
        }
    }
    return defaultValue

}
type Schema = FormItemProps<ExtraRenderParams>['schema'] & {
    schemaKey: string
}
function transitionDesignFormSchema(schema: DesignFormSchema): Schema {
    const reulust = {
        schemaKey: schema.id,
        ifShow: (renderParams) => {
            return executeJSCode(schema, 'ifShow', true, { renderParams })
        },
        label: (renderParams) => {
            return executeJSCode(schema, 'label', '', { renderParams })
        },
        field: schema.field,
        category: schema.category,
        component: schema.component,
        children: (schema.children || []),
        componentProps: (renderParams) => {
            return executeJSCode(schema, 'componentProps', {}, { renderParams })

        },
        componentStyle: (renderParams) => {
            return executeJSCode(schema, 'componentStyle', {}, { renderParams })
        },
    } as Schema
    return reulust
}
function transitionBaseFormSchema(schema): Schema {
    return {
        ...schema,
        category: schema.category ?? "Input",
        schemaKey: schema.schemaKey ?? buildUUID()
    };
}
function getFormItem(raw) {
    let schema
    if (unref(isDesignFormSchema)) {
        schema = transitionDesignFormSchema(raw)
    } else {
        schema = transitionBaseFormSchema(raw)
    }
    const formItemProps = { schema, ...pick(props, ['formModel', 'setFieldsValue', 'getSlot', 'extraRenderParams']) }
    const { getDynamicConfig } = useDynamicConfig(formItemProps)
    const bind = {
        style: {
            padding: '5px'
        },
        ...getDynamicConfig(schema.formItemProps),
        ...formItemProps,
        ...getInheritanceEvent(emit, ['formItemInstanceReady']),
    }
    return <FormItem  {...bind} >   </FormItem>

}
const render = (() => {
    if (unref(isDesign)) {
        const draggableBind = {
            modelValue: unref(modelValue),
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
        return (unref(modelValue) || []).map(getFormItem)
    }
}) 
</script>
<style scoped>
/* :deep(.selectedSchame) {
    border: 1px solid yellow !important;
} */
</style>