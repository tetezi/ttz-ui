<template>
    <ElRow v-bind="getBind" style="background-color: #FFFFFF;">
        <template v-for="slot in Object.keys(slots)" #[slot] :key="slot">
            <component :is="slots[slot]"></component>
        </template>
    </ElRow>
</template>
<script lang="ts" setup>
import { computed, getCurrentInstance } from 'vue';
import type { RowProps, RowShortEvent } from './types';
import { ElRow } from 'element-plus';

const appContext = getCurrentInstance()!.appContext;
if (!('el-row' in appContext.components)) {
    appContext.app.component('el-row', ElRow);
}
const props = withDefaults(defineProps<RowProps>(), {})
const emit = defineEmits<RowShortEvent>()
const getBind = computed(() => {
    return props
})
const slots = defineSlots()  
</script>