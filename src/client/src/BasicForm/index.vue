<template>
    <formComp style="height:500px" v-model="value"></formComp>
</template>
<script lang="ts" setup>
import { useForm } from '@/components' 
import { ref } from 'vue';
const value = ref()
const [formComp] = useForm({
    formSchemas: [
        {
            field: 'asd', component: 'Input', componentProps: (renderParams) => {
                return {}
            }
        }
    ]
})
</script>