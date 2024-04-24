<template>
    <el-dialog v-model="localModelValue" v-bind="bind">
        <template #header>
            <component :is="()=>getDialogSlot('header')"></component>
        </template>
        <template #default>
            <component :is="()=>getDialogSlot('body')"></component>
        </template>
        <template #footer>
            <component :is="()=>getDialogSlot('footer')"></component>
            <BasicButton :func="close">关闭</BasicButton> 
        </template>
    </el-dialog>
</template>
<script lang="ts" setup>
import { defaultDialogProps } from './defaultProps';
import type { DialogProps, DialogShortEvent } from './types';
import { useLocalProps, useLocalModel, getInheritanceEvent, getSlot } from '@/utils';
import { computed, unref } from 'vue';
import { omit } from 'lodash';

const props = withDefaults(defineProps<DialogProps>(), defaultDialogProps)
const emit = defineEmits<DialogShortEvent>()
const modelValue = defineModel<boolean>()
const slots = defineSlots()
/**
* 本地化组件道具数据
*/
const { getProps, setProps, emitEvent } = useLocalProps<DialogProps, DialogShortEvent, typeof defaultDialogProps>(props, emit)
/**
 * 本地化双向绑定数据
 */
const { localModelValue, setModelValue } = useLocalModel(modelValue, () => false)

const bind = computed(() => {
    return {
        beforeClose: (done) => close(true),
        ...omit(unref(getProps), ['headerRender', 'bodyRender', 'footerRender', 'beforeClose']),
        ...getInheritanceEvent(emitEvent, ['open', 'opened', 'close', 'closed']),
    }
})
const dialogMethods = computed(() => {
    return {
        open, close
    }
})
function getDialogSlot(name: 'header' | 'body' | 'footer') {
    const { headerRender, bodyRender, footerRender } = unref(getProps)
    console.log(slots)
    if (name === 'header') {
        return headerRender ? headerRender(unref(dialogMethods)) : getSlot(slots, name, unref(dialogMethods))
    } else if (name === 'body') {
        return bodyRender ? bodyRender(unref(dialogMethods)) : getSlot(slots, 'default', unref(dialogMethods))

    } else if (name === 'footer') {
        return footerRender ? footerRender(unref(dialogMethods)) : getSlot(slots, name, unref(dialogMethods))

    }
}
function open() {
    setModelValue(true)
}
async function close(checkBeforeClose: boolean = true) {
    const { beforeClose } = unref(getProps)
    if (checkBeforeClose && beforeClose) {
        await beforeClose()
    }
    setModelValue(false)
}
</script>