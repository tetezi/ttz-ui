<template>
    <el-button @click="() => dialogMethods.open({ id: 'asd' })"></el-button>
    <dialogComp>
        <!-- <template #default="row">
           
        </template> -->
    </dialogComp>
</template>
<script lang="tsx" setup>
import { ref, type Component, type DefineSetupFnComponent, type DefineComponent, type PropType } from 'vue'
import { BasicDialog, useDialog, } from '@/components'
import TTT from './test.vue'
const [dialogComp, dialogMethods] = useDialog({
    bodyRender: (row) => {
        return <div>
            {row.id}
            <TTT></TTT>
        </div>
    },
    submitApi: async () => {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve()
            }, 3000);
            // unref(formRef).submit()
        })
    },
})

</script>