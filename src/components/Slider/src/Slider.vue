<template>
    <el-slider   v-bind="getBind"  v-model="modelValue">
    </el-slider>
</template>
<script lang="tsx" setup generic="Range extends boolean">
import { computed } from 'vue';
import { omit } from 'lodash'
import type { Props, ShortEvent } from './types'
import defaultProps from './defaultProps';
import { getInheritanceEvent } from '@/utils';
const props = withDefaults(defineProps<Props<Range>>(), defaultProps)
const emit = defineEmits<ShortEvent>()
const modelValue = defineModel<Range extends true ? number[] : number>()
const getBind = computed(() => {
    return {
        ...omit(props, ['modelValue']),
        ...getInheritanceEvent(emit, ['change']),
    }
}) 
</script>