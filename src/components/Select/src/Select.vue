<template>
    <el-select  v-bind="getBind"  v-model="modelValue">
        <el-option v-for="item in options" :key="get(item, props.valueField)" :label="getLabel(item)"
            :value="isObject ? item : get(item, props.valueField)" />
    </el-select>
</template>
<script lang="ts" setup generic="Option extends (Recordable)">
import { computed } from 'vue';
import { get, isFunction, omit } from 'lodash'
import type { Props, ShortEvent } from './types'
import type { Recordable } from '@/global';
import defaultProps from './defaultProps';
const props = withDefaults(defineProps<Props<Option>>(), defaultProps)
const emit = defineEmits<ShortEvent<Option>>()
const modelValue = defineModel<string | Option | Array<Option> | Array<string>>()
const getBind = computed(() => {
    return {
        valueKey: props.isObject ? props.valueField : undefined,
        style: {
            width: '100%'
        },
        ...omit(props, ['modelValue','options', 'labelField', 'valueField', 'isObject']),
        onChange: (val: string | Option | Array<Option> | Array<string>) => {
            function getOption(val: string | Option) {
                return props.options.find((opt) => {
                    return get(opt, props.valueField) === (props.isObject ? get(val, props.valueField) : val)
                })
            }
            if (props.multiple) {
                let v = val as  Array<Option> | Array<string>
                emit('change', v, v.map((item) => getOption(item)))
            } else {
                let v = val as string | Option
                emit('change', v, getOption(v))
            }

        },
    }
})
function getLabel(item: Option) {
    if (isFunction(props.labelField)) {
        return props.labelField(item)
    } else {
        return get(item, props.labelField)
    }
} 
</script>