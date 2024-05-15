<template>
    <el-dialog v-model="localModelValue" v-bind="bind">
        <template #header>
            <component :is="headerSlotVNode"></component>
        </template>
        <template #default>
            <component :is="defaultSlotVNode"></component>
        </template>
        <template #footer>
            <component :is="footerSlotVNode"></component>
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
import { isUndefined, omit } from 'lodash';
import { useDialogSlots } from './hooks';
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
const { footerSlotVNode, headerSlotVNode, defaultSlotVNode } = useDialogSlots(getProps, slots)

function setData(data: Data) {
    setProps({ data: data })
}
const getData = computed(() => unref(getProps).data)
async function open(data?: Data, checkBeforeOpen: boolean = true) {
    const { beforeOpen } = unref(getProps)
    if (!isUndefined(data)) {
        setData(data)
    }
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
    console.log(submitApi)
    if (submitApi) {
        await submitApi()
    }
    console.log(submitApi)
    await close(submitCheckBeforeClose)
}
const dialogMethods: DialogMethods<Data> = {
    open, close, setProps, getProps, submit, setData, getData
}
onMounted(() => {
    emitEvent('register', dialogMethods)
})  
</script>