<template>
    <el-input-number  v-bind="getBind" v-model="modelValue">
    </el-input-number>
</template>
<script lang="tsx" setup>
import { computed } from 'vue';
import { omit } from 'lodash'
import type { Props, ShortEvent } from './types'
import defaultProps from './defaultProps';
import { getInheritanceEvent } from '@/utils';
const props = withDefaults(defineProps<Props>(), defaultProps)
const emit = defineEmits<ShortEvent>()
const modelValue = defineModel<number>()
const getBind = computed(() => {
    return {
        ...omit(props, ['modelValue']),
        ...getInheritanceEvent(emit, ['blur', 'focus', 'change']),
    }
}) 
</script>