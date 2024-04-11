<template> 
{{ a }}
    <Form :formSchemas="formSchemas"     v-model="a"   >
        <template #slotTest>
            slot
        </template>
    </Form>
</template>
<script lang="tsx" setup>
import { Form } from '@/components'
import type { FormSchemas } from '@/components/Form/src/types'; 
import { computed, ref,watch } from 'vue';
const a  = ref({input:
    'asd'
}) 
const formSchemas: FormSchemas = [{ 
    field: 'render', render: ({ compValue }) => {
        return <el-input modelValue={compValue.value} onInput={(v) => {
            console.log(4, v)
            compValue.value = v
        }}></el-input>
    },
}, {
    field: 'slotTest',
    slot: 'slotTest'
}, {
    field: 'render2', render: () => ['bb', <div>daw</div>]
}, {
    field: 'input', component: 'Input', componentSlot: <div>test</div>
}, {
    category: 'Display', component: 'BasicButton', componentSlot: <div>test</div>
}]
const ttt = computed(()=>{
    return a.value.input
})
watch(ttt,(v)=>{
    console.log('a变了',v)
})
</script>