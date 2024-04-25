<template>
    <el-button @click="() => www()"></el-button> 
    <dialogComp>
        <template #default="row">
            --{{ row }}--
        </template>
    </dialogComp>
</template>
<script lang="tsx" setup>
import { ref, type Component, type DefineSetupFnComponent, type DefineComponent, type PropType } from 'vue'
import { BasicDialog, useDialog, } from '@/components'
const v = ref(false)
function aa(a) {
    console.log(a, 'aa')
    return <div style='color:red' onClick={() => a.close(false)}>wg</div>
}
function www() {
    dialogMethods.open('11')
}
function bef(done) {
    return new Promise(() => { })
}
function closea() {
    console.log('关闭')
}
const [dialogComp, dialogMethods] = useDialog({})

</script>