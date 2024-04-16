<template>

    <FormVNode v-model="a">
        <template #slotTest>
            slot
        </template>
    </FormVNode>
</template>
<script lang="tsx" setup>
import { BasicForm, useForm } from '@/components'
import type { FormSchemas } from '@/components/BasicForm/src/types';
import { computed, ref, watch } from 'vue';
const a = ref({
    input:
        'asd'
})
const [FormVNode, formMethods] = useForm({
    formSchemas: [{
        label: 'asd',
        field: 'render', render: ({ compValue }) => {
            return <el-input modelValue={compValue.value} onInput={(v) => {
                console.log(4, formMethods)
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
})
const ttt = computed(() => {
    return a.value.input
})
watch(ttt, (v) => {
    console.log('a变了', v)
})
</script>