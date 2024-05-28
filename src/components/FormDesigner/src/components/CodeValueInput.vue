<template>
    <div>
        <el-input v-bind="getBind" v-model="modelValue">
        </el-input>
    </div>

</template>
<script lang="tsx" setup>
import { computed, withKeys, } from 'vue';
import { omit } from 'lodash'
import { getInheritanceEvent } from '@/utils';
type ShortEvent = {}
type Props = {}
const defaultProps = {}
const props = withDefaults(defineProps<Props>(), defaultProps)
const emit = defineEmits<ShortEvent>()
const modelValue = defineModel<string>()
const getBind = computed(() => {
    return {
        ...omit(props, ['modelValue']),
        ...getInheritanceEvent(emit, []),
    }
})
const slots = defineSlots()  
</script>