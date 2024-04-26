<template>
    <el-dialog v-model="localModelValue" v-bind="bind">
        <template #header>
            <component :is="getDialogSlot('header')"></component>
        </template>
        <template #default>
            <component :is="getDialogSlot('body')"></component>
        </template>
        <template #footer>
            <component :is="getDialogSlot('footer')"></component>
            <template v-if="getProps.showActionBtns">
                <BasicButton v-if="getProps.showCancelBtn" icon="CloseBold" :func="close">关闭</BasicButton>
                <BasicButton v-if="getProps.showSubmitBtn" icon="Select" :func="submit" type="primary">提交</BasicButton>
            </template>
        </template>
    </el-dialog>
</template>
<script lang="tsx" setup generic="Data">
import { defaultDialogProps } from './defaultProps';
import type { DialogMethods, DialogProps, DialogShortEvent } from './types';
import { useLocalProps, useLocalModel, getInheritanceEvent, getSlot } from '@/utils';
import { computed, onMounted, unref } from 'vue';
import { omit } from 'lodash';
const props = withDefaults(defineProps<DialogProps<Data>>(), defaultDialogProps)
const emit = defineEmits<DialogShortEvent<Data>>()
const modelValue = defineModel<boolean>()
const slots = defineSlots()
/**
* 本地化组件道具数据
*/
const { getProps, setProps, emitEvent } = useLocalProps<DialogProps<Data>, DialogShortEvent<Data>, typeof defaultDialogProps>(props, emit)
/**
 * 本地化双向绑定数据
 */
const { localModelValue, setModelValue } = useLocalModel(modelValue, () => false)

const bind = computed(() => {
    return {
        beforeClose: (done) => close(true),
        ...omit(unref(getProps), ['data', 'headerRender', 'bodyRender', 'footerRender', 'beforeClose', 'beforeOpen', 'submitApi', 'submitCheckBeforeClose', 'showActionBtns', 'showSubmitBtn', 'showCancelBtn']),
        ...getInheritanceEvent(emitEvent, ['open', 'opened', 'close', 'closed']),
    }
})
function getDialogSlot(name: 'header' | 'body' | 'footer') {
    const { bodyRender, headerRender, footerRender, data } = unref(getProps)
    if (name === 'header') {
        return headerRender ? headerRender((data as Data)) : getSlot(slots, name, (data as Data)) || unref(getProps).title
    } else if (name === 'body') {
        return bodyRender ? bodyRender((data as Data)) : getSlot(slots, 'default', (data as Data))
    } else if (name === 'footer') {
        return footerRender ? footerRender((data as Data)) : getSlot(slots, name, (data as Data))

    }
}

function setData(data: Data) {
    setProps({ data: data })
}
const getData = computed(() => unref(getProps).data)
async function open(data: Data, checkBeforeOpen: boolean = true) {
    const { beforeOpen } = unref(getProps)
    setData(data)
    if (checkBeforeOpen && beforeOpen) {
        await beforeOpen()
    }
    setModelValue(true)
}
async function close(checkBeforeClose: boolean = true) {
    const { beforeClose } = unref(getProps)
    if (checkBeforeClose && beforeClose) {
        await beforeClose()
    }
    setModelValue(false)
}
async function submit() {
    const { submitApi, submitCheckBeforeClose } = unref(getProps)
    if (submitApi) {
        await submitApi()
    }
    await close(submitCheckBeforeClose)
}
const dialogMethods: DialogMethods<Data> = {
    open, close, setProps, getProps, submit, setData, getData
}
onMounted(() => {
    emitEvent('register', dialogMethods)
})  
</script>