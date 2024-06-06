<template>
    <formComp style="height:500px" v-model="value" :isDesign="true"></formComp>
    <formComp2 style="height:500px" v-model="value" :isDesign="true" :isDesignFormSchema="true"></formComp2>
</template>
<script lang="ts" setup>
import { useForm } from '@/components'
import { ref } from 'vue';
const value = ref({})
const [formComp] = useForm({
    formSchemas: [
        {
            category: 'Container', component: 'Card', schemaKey: '1', componentProps: {
                title: '1'
            }, children: [
                {
                    category: 'Container', component: 'Card', schemaKey: '2', componentProps: {
                        title: '2'
                    }, children: [{
                        category: 'Container', component: 'Card', schemaKey: '3', componentProps: {
                            title: '3'
                        }, children: []
                    }, {
                        category: 'Container', component: 'Card', schemaKey: '4', componentProps: {
                            title: '4'
                        }, children: []
                    }, {
                        category: 'Input', component: 'Input', schemaKey: '5', field: '1'
                    }]
                },
            ]
        },
    ]
})
const [formComp2] = useForm({
    formSchemas: [
        {
            category: 'Container', component: 'Card', schemaKey: '1', componentProps: {
                type: 'value',
                value: {
                    title: '1'
                }
            }, children: [
                {
                    category: 'Container', component: 'Card', schemaKey: '2', componentProps: {
                        type: 'value',
                        value: {
                            title: '2'
                        }
                    }, children: [{
                        category: 'Container', component: 'Card', schemaKey: '3', componentProps: {
                            type: 'value',
                            value: {
                                title: '3'
                            }
                        }, children: []
                    }, {
                        category: 'Container', component: 'Card', schemaKey: '4', componentProps: {
                            type: 'value',
                            value: {
                                title: '4'
                            }
                        }, children: []
                    }, {
                        category: 'Input', component: 'Input', schemaKey: '5', field: '1'
                    }]
                },
            ]
        },
    ]
}) 
</script>