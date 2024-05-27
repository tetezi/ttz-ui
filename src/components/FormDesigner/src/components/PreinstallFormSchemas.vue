<template>
    <div :style="{
        border: '1px solid black', height: '100%', boxSizing: 'border-box'
    }">
        <div :style="{ textAlign: 'center', margin: '5px', }">预设组件</div>
        <Draggable :list='preinstallFormSchemas' item-key="id"
            :group="{ name: 'formSchemas', pull: 'clone', put: false }" :clone>
            <template #item="{ element }">
                <div :style="{
                    border: '1px solid black',
                    padding: '5px',
                    margin: '5px',
                    textAlign: 'center',
                }"> {{ element.component }}</div>
            </template>
        </Draggable>
    </div>

</template>
<script lang="ts" setup>

import type { DesignFormSchema } from '@/components/BasicForm/src/types';
import { buildUUID } from '@/utils';
import { cloneDeep } from 'lodash';
import { ref } from 'vue';
import Draggable from 'vuedraggable'
const preinstallFormSchemas = ref<DesignFormSchema[]>([
    {
        field: '1', label: {
            value: '11'
        }, component: 'Input', category: 'Input', componentProps: {
            code: ` return {
                    onChange:(v)=>{
                        console.log('v',1,renderParams.getFormItemInstance(renderParams.schema.schemaKey))
                    }
                }
             `
        },
        width: '500px',
        id: '1',
        componentStyle: {
            code: ` 
                return {
                    width: '100px'
                }
            `
        }

    },
    {
        field: '2', label: {
            value: '11'
        },
        component: 'Card',
        category: 'Container',
        componentProps: {
            code: ` return {
                    onChange:(v)=>{
                        console.log('v',v,renderParams)
                    },
                    title:'标题'
                }
             `
        },
        children: [
            {
                field: '21', label: {
                    value: '11'
                }, component: 'Input', category: 'Input', componentProps: {
                    code: ` return {
                    onChange:(v)=>{
                        console.log('v',v,renderParams)
                    }
                }
             `
                },
                width: '500px',
                id: '21',
                componentStyle: {
                    code: ` 
                return {
                    width: '100px'
                }
            `
                }

            }, {
                field: '22', label: {
                    value: '111'
                }, component: 'Input', category: 'Input', componentProps: {
                    code: ` return {
                    onChange:(v)=>{
                        console.log('v',v,renderParams)
                    }
                }
             `
                },
                width: '500px',
                id: '22',
                componentStyle: {
                    code: ` 
                return {
                    width: '100px'
                }
            `
                }

            },
        ],
        // width: '500px',
        id: '2',
    },
])
function clone(raw) {
    const data = cloneDeep(raw)
    function cloneId(d) {
        d.id = buildUUID()
        if (d.children) {
            d.children.forEach(cloneId)
        }
        return d
    } 
    return cloneId(data)
}
</script>