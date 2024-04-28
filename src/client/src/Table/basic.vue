<template>
    <div style="padding:10px; height:500px">
        <TableComponent v-model="modelValue"> </TableComponent>
    </div>
</template>
<script lang="tsx" setup>
import { defineComponent, reactive, ref, unref } from 'vue'
import { BasicTable, useTable, } from '@/components'
import { buildUUID, getInheritanceEvent, getSlot, useLocalModel, useLocalProps } from '@/utils';
import { omit, set } from 'lodash';
import BasicButton from '@/components/BasicButton/src/BasicButton.vue';
const columns = [
    {
        label: 'aa',
        childrenColumns: [
            { prop: 'aa', label: 'aa' },
            { prop: 'bb', label: 'bb' }
        ]
    }, { prop: 'bb', label: 'bb' }
]
const [TableComponent] = useTable({
    title: () => '测试',
    columns, pageConfigs: {
        // pageLayout?: string | undefined;
        pageSize: 10
    },
    headerActionRender:<BasicButton>asd</BasicButton>
})
const modelValue = ref([{ aa: 11 }, { aa: 114 }, { aa: 11 }, { aa: 11 }, { aa: 11 }, { aa: 11 }, { aa: 11 }, { aa: 11 }, { aa: 11 }, { aa: 11 }, { aa: 11 }, { aa: 11 }, { aa: 11 }, { aa: 11 }, { aa: 11 }, { aa: 11 }, { aa: 11 }, { aa: 11 }, { aa: 11 }, { aa: 11 }, { aa: 11 }, { aa: 11 }, { aa: 11 }, { aa: 11 }, { aa: 11 }, { aa: 11 }, { aa: 11 }, { aa: 11 }, { aa: 11 }, { aa: 11 }, { aa: 11 }, { aa: 11 }, { aa: 11 }, { aa: 11 }, { aa: 11 }, { aa: 11 }, { aa: 11 }, { aa: 11 }, { aa: 11 }, { aa: 11 }, { aa: 11 }, { aa: 11 }, { aa: 11 }, { aa: 11 }, { aa: 11 }, { aa: 11 }, { aa: 11 }, { aa: 11 }, { aa: 11 }, { aa: 11 }, { aa: 11 }, { aa: 11 }, { aa: 11 }, { aa: 11 }, { aa: 11 }, { aa: 11 }, { aa: 11 }, { aa: 11 }, { aa: 11 }, { aa: 11 }, { aa: 11 }, { aa: 11 }, { aa: 11 }, { aa: 11 }, { aa: 11 }, { aa: 11 }, { aa: 11 }, { aa: 11 }, { aa: 11 }, { aa: 11 }, { aa: 11 }, { aa: 11 }, { aa: 11 }, { aa: 11 }, { aa: 11 }, { aa: 11 }, { aa: 11 }, { aa: 11 }, { aa: 11 }, { aa: 11 }, { aa: 11 }, { aa: 11 }, { aa: 11 }, { aa: 11 }, { aa: 11 }, { aa: 11 }, { aa: 11 }, { aa: 11 }, { aa: 11 }, { aa: 11 }, { aa: 11 }, { aa: 11 }, { aa: 11 }, { aa: 11 }, { aa: 11 }, { aa: 11 }, { aa: 11 }, { aa: 11 }, { aa: 11 }, { aa: 11 }, { aa: 11 }, { aa: 11 }, { aa: 11 }, { aa: 11 }, { aa: 11 }, { aa: 11 }, { aa: 11 }, { aa: 11 }, { aa: 11 }, { aa: 11 }, { aa: 11 }, { aa: 11 }, { aa: 11 }, { aa: 11 }, { aa: 11 }, { aa: 11 }, { aa: 11 },])
function www() {
    modelValue.value = [{}]
} 
</script>