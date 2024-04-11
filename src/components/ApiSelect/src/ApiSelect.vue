<template>
    <Select v-model="modelValue" v-bind="getBind">
    </Select>
</template>
<script lang="ts" setup generic="Params extends (Recordable), Option extends (Recordable)">
import { Select, type SelectBind } from '@/components/Select'
import { getInheritanceEvent, useApi } from '@/utils';


import { computed, onMounted, toValue, unref, type MaybeRefOrGetter } from 'vue';
import type { Props, ShortEvent } from './types'
import { omit, isArray } from 'lodash';
import defaultProps from './defaultProps';
const props = withDefaults(defineProps<Props<Params, Option>>(), defaultProps as any)
const emit = defineEmits<ShortEvent<Option>>()
const modelValue = defineModel<string | Option>()
const paramsRef = computed<Params>(() => {
    return toValue(props.params || {}) as Params
})
const getBind = computed<SelectBind<Option>>(() => {
    const bind: SelectBind<Option> = {
        options: unref(dataRef),
        loading: unref(loadingRef),
        ...omit(props, ['modelValue', 'api', 'params', 'resultField', 'immediate']),
        ...getInheritanceEvent(emit, ['change']),
        onFocus: () => {
            if (!(props.immediate || unref(isRunningRef))) {
                init()
            }
        },
        remote: true,
        remoteMethod: (query: string) => {
            const params = {
                ...unref(paramsRef),
                [props.queryField]: query
            } as Params
            fetch(params)
        },
    }
    return bind
})
const { dataRef, loadingRef, isRunningRef, init, fetch } = useApi<Params, Option[]>(() => {
    return {
        api: props.api,
        resultField: props.resultField,
        immediate: props.immediate,
        defaultData: [],
        afterFetch: async (data: unknown) => {
            if (isArray(data)) {
                return data
            } else {
                return Promise.reject(`ApiSelect属性“data”。期望array，得到${typeof data} `)
            }
        },
        onInit: (data) => {
            emit('init', data)
        },
        onChangeData: (data) => {
            emit('options-change', data || [])
        }
    }
}, paramsRef)

onMounted(() => {
    if (!props.api) {
        // ElMessage.warning('下拉框API未传入,请联系管理员')
    }
})
defineExpose({
    fetch
})
</script>