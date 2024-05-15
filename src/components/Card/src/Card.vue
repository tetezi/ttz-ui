<template>
    <el-card v-bind='getBind'>
        <template v-for="slot in Object.keys(slots)" #[slot] :key="slot">
            <component :is="slots[slot]"></component>
        </template>
    </el-card>
</template>
<script lang="tsx" setup>
import type { CardProps } from './types';
import { defaultCardProps } from './defaultProps';
import { pick } from 'lodash';
import { computed } from 'vue';

const slots = defineSlots()
const props = withDefaults(defineProps<CardProps>(), defaultCardProps)
const getBind = computed(() => {
    return {
        header: props.title,
        bodyStyle: {
            padding: 0,
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