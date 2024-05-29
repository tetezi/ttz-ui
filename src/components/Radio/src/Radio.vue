<template>
    <el-radio-group v-bind="getBind" v-model="elRadiomodelValue">
        <template v-if="props.isButton">
            <el-radio-button v-for="item in options" :key="get(item, props.valueField)"
                :value="get(item, props.valueField)">{{
                    getLabel(item) }}
            </el-radio-button>
        </template>
        <template v-else>
            <el-radio v-for="item in options" :key="get(item, props.valueField)" :value="get(item, props.valueField)">{{
                getLabel(item) }}
            </el-radio>
        </template>
    </el-radio-group>
</template>
<script lang="ts" setup generic="Option extends (Recordable)">
import { computed, unref } from 'vue';
import { get, isFunction, omit } from 'lodash'
import type { RadioProps, RadioShortEvent } from './types'
import type { Recordable } from '@/global';
import { defaultRadioProps } from './defaultProps';
const props = withDefaults(defineProps<RadioProps<Option>>(), defaultRadioProps)
const emit = defineEmits<RadioShortEvent<Option>>()
const modelValue = defineModel<string | Option>()
const elRadiomodelValue = computed({
    get: () => {
        return props.isObject ? get(unref(modelValue), props.valueField) : unref(modelValue)
    },
    set: (val) => {
        modelValue.value = props.isObject ? findOption(val) : val
    }
})
const getBind: any = computed(() => {
    return {
        style: {
            width: '100%'
        },
        ...omit(props, ['modelValue', 'options', 'labelField', 'valueField', 'isObject']),
        onChange: (val: string) => {
            emit('change', val, findOption(val))
        },
    }
})
function findOption(val: string) {
    return props.options.find((opt) => {
        return get(opt, props.valueField) === val
    })
}
function getLabel(item: Option) {
    if (isFunction(props.labelField)) {
        return props.labelField(item)
    } else {
        return get(item, props.labelField)
    }
} 
</script>