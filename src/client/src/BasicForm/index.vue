<template>
    {{ a }}
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
    TableName: 'TableName',

})
const [FormVNode, formMethods] = useForm({
    defaultValue: { TableName: 'wf' },
    formSchemas: [{
        category: 'Container', component: 'Card', componentProps: { title: 'asd' }, children: [{ field: 'TableName', label: '测试', component: 'Input' },]
    }, {
        category: 'Container', component: 'Card', children: [{ field: 'TableName', label: '测试', component: 'Input' },]
    }, {
        field: 'input', component: 'Input', componentSlot: <div>test</div>
    }, {
        category: 'Display', component: 'BasicButton', componentSlot: <div>test</div>
    },
    { field: 'TableName', label: 'TableName', component: 'Input' },
    { field: 'Name', label: 'Name', component: 'Input' },
    { field: 'No', label: 'No', component: 'Input' },
    {
        field: 'Cols', label: 'Cols', component: 'EditableTable', componentStyle: {
            height: '300px',
        }, componentProps: {

            columns: [
                { label: 'Id', prop: 'Id' },
                {
                    label: 'Name', prop: 'Name', editConfig: {
                        component: 'Input'
                    }
                },
                {
                    label: 'No', prop: 'No', editConfig: {
                        component: 'Input'
                    }
                },
                {
                    label: 'ColType', prop: 'ColType', editConfig: {
                        component: 'Input'
                    }
                }, {
                    label: 'IsSubTable', prop: 'IsSubTable', editConfig: {
                        component: 'Input'
                    }
                }, {
                    label: 'SubTableType', prop: 'SubTableType', editConfig: {
                        component: 'Input'
                    }
                }, {
                    label: 'IsSSSubTableIdubTableIdubTable', prop: 'SubTableId', editConfig: {
                        component: 'Input'
                    }
                }
            ]
        }

    },
    ]
})
const ttt = computed(() => {
    return a.value.input
})
watch(ttt, (v) => {
    console.log('a变了', v)
})
</script>