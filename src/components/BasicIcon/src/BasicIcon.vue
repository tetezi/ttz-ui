<template>
    <ElIcon :size="size" :class="props.loading ? 'is-loading' : ''">
        <component :is="icon" />
    </ElIcon>
</template>
<script lang="tsx" setup>
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import { computed, defineComponent, ref, unref } from 'vue';
import type { BasicIconProps } from './types';
import { isString } from 'lodash';
const props = defineProps<BasicIconProps>()
const WebIcon = defineComponent((props) => {
    const htmlRef = ref('')
    fetch(props.url).then((res) => {
        res.text().then((hhh) => {
            htmlRef.value = hhh
        })
    })
    return () => {
        return <span v-html={unref(htmlRef)} ></span>
    }
}, {
    props: ['url']
})
const icon = computed(() => {
    if (props.loading) {
        return ElementPlusIconsVue['Loading']
    } else {
        if (isString(props.icon)){
            const icons: any = ElementPlusIconsVue
            if(icons[props.icon]){
                return  icons[props.icon]
            }else{
                return <WebIcon url={props.icon}></WebIcon>
            }
        }else{
            return props.icon

        }
        // if (props.iconName) {
        //     const icons: any = ElementPlusIconsVue
        //     return icons[props.iconName]
        // } else if (props.iconUrl) {
        //     return <WebIcon url={props.iconUrl}></WebIcon>
        // } else if (props.iconComponent) {
        //     return props.iconComponent
        // } else {
        //     return null
        // }
    }
})
</script>