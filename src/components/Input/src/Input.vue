<template>
    <div>
        <el-input v-bind="getBind" v-model="modelValue">
            <template v-for="slot in Object.keys(slots)" #[slot] :key="slot">
                <component :is="slots[slot]"></component>
            </template>
        </el-input>
    </div>

</template>
<script lang="tsx" setup>
import { computed } from 'vue';
import { omit } from 'lodash'
import type { Props, ShortEvent } from './types'
import defaultProps from './defaultProps';
import { getInheritanceEvent } from '@/utils';
const props = withDefaults(defineProps<Props>(), defaultProps)
const emit = defineEmits<ShortEvent>()
const modelValue = defineModel<string>()
const getBind = computed(() => {
    return {
        ...omit(props,['modelValue']),
        ...getInheritanceEvent(emit, ['blur', 'focus', 'change', 'input', 'clear']),
    }
})
const slots = defineSlots() 
</script>