<template>
    <el-switch v-bind="getBind" v-model="modelValue">
    </el-switch>
</template>
<script lang="tsx" setup  >
import { computed } from 'vue';
import { omit } from 'lodash'
import type { Props, ShortEvent } from './types'
import defaultProps from './defaultProps';
import { getInheritanceEvent } from '@/utils';
const props = withDefaults(defineProps<Props>(), defaultProps)
const emit = defineEmits<ShortEvent>()
const modelValue = defineModel<boolean>()
const getBind = computed(() => {
    return {
        ...omit(props, ['modelValue']),
        ...getInheritanceEvent(emit, ['change']),
    }
}) 
</script>