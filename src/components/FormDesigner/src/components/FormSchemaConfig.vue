<template>
    <FormComp></FormComp>
</template>
<script lang="ts" setup>
import { useForm } from '@/components/BasicForm';
 
const [FormComp, formMethods] = useForm({
    formSchemas: [
        { field: ['label','code'], label: '标题', component: 'Input', componentProps: { placeholder: '请输入标题' } },
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
    setValue:(val)=>{
        console.log(val)
        formMethods.setModelValue(val)
    }
})
</script>