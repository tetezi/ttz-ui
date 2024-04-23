<template>
    {{ value }}
    <EditableTable style="height:500px" :columns="columns" v-model="value"></EditableTable>
</template>
<script lang="ts" setup>
import { EditableTable } from '@/components'
import type { EditableTableColumn } from '@/components'
import { ref } from 'vue';
const value = ref() 
const columns: EditableTableColumn<any>[] = [
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
</script>