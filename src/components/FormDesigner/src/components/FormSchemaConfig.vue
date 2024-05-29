<template>
    <FormComp></FormComp>
</template>
<script lang="tsx" setup>
import { useForm } from '@/components/BasicForm';
import CodeValueInput from './CodeValueInput.vue'
import { markRaw, ref, watch } from 'vue';
const [FormComp, formMethods] = useForm({
    formSchemas: [
        { field: 'label', label: '标题', component: () => CodeValueInput },
        {
            category: 'Display', component: 'BasicButton', componentSlot: { default: () => '提交' }, componentProps: {
                func: () => {
                    formMethods.submitFunction()
                }
            }
        }
    ],

})
defineExpose({
    setValue: (val) => {
        formMethods.setModelValue(val)
    }
})
</script>