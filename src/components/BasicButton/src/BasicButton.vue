<template>
    <Render></Render>
</template>
<script lang="tsx" setup>
import { computed, ref, unref, useSlots } from 'vue';
import { isFunction, isString, omit } from 'lodash'
import type { Props, ShortEvent } from './types'
import defaultProps from './defaultProps';
import { getInheritanceEvent } from '@/utils';
import { ElMessage } from 'element-plus';
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
const props = withDefaults(defineProps<Props>(), defaultProps)
const emit = defineEmits<ShortEvent>()
const slots = useSlots()
const loadingRef = ref(false)

async function handlerClick(...e: any[]) {
    if (unref(loadingRef) === true) {
        return
    }
    emit('click')
    loadingRef.value = true
    try {
        if (isFunction(props.func)) {
            await props.func(...e)
        }
    } catch (err) {
        console.log(err)
        if (props.errMsg) {
            ElMessage.error(props.errMsg)
        }
    }
    loadingRef.value = false
}
const Render = computed(() => {
    const { tip, isConfirm } = props
    const bind = {
        ...omit(props, ['icon']),
        ...getInheritanceEvent(emit, []),
        loading: unref(loadingRef),
        onClick: isConfirm ? undefined : handlerClick,
        icon: isString(props.icon)? ElementPlusIconsVue[props.icon]:props.icon
    }
    const btn = <el-button   {...bind} v-slots={slots}>
    </el-button>
    const confirm = isConfirm ? <el-popconfirm title="是否确认？"  {...bind} onConfirm={handlerClick}>
        {{ reference: () => btn }}
    </el-popconfirm> : btn

    if (tip) {
        return <el-tooltip content={tip}>{confirm}</el-tooltip>
    } else {
        return confirm
    }
})
</script>