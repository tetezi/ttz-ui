<template>
    <el-card style="margin:0 6px" v-bind='getBind'>
        <template v-for="slot in Object.keys(slots)" #[slot] :key="slot">
            <template v-if="slot === 'default'">
                <el-scrollbar :viewStyle="{ height: '100%', padding: '3px' }">
                    <component :is="slots['default']"></component>
                </el-scrollbar>
            </template>
            <component v-else :is="slots[slot]"></component>
        </template>
    </el-card>
</template>
<script lang="tsx" setup>
import type { CardProps } from './types';
import { defaultCardProps } from './defaultProps';
import { isNumber, pick } from 'lodash';
import { computed } from 'vue';

const slots = defineSlots()
const props = withDefaults(defineProps<CardProps>(), defaultCardProps)
const getBind = computed(() => {
    return {
        header: props.title,
        bodyStyle: {
            padding: isNumber(props.bodyPadding) ? `${props.bodyPadding}px` : props.bodyPadding,
            ...props.bodyStyle,
        },
        ...pick(props, ['footer', 'shadow']),
    }
}) 
</script>
<style scoped>
:deep(.el-card__header) {
    padding: 9px 18px !important;
}
</style>