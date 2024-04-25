<template>
    <el-button @click="() => www()"></el-button>
    <!-- <BasicDialog v-model="v" title="asd" :bodyRender="aa" :before-close="bef" @close="close">asd
        <template #footer>
            <BasicButton>asasfd</BasicButton>

        </template>
</BasicDialog> -->
    <dialogComp>
        <template #default>
            asd
        </template>
    </dialogComp>
    <fwa @g="(a) => { }"></fwa>
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
    dialogMethods.open()
}
function bef(done) {
    return new Promise(() => { })
}
function closea() {
    console.log('关闭')
}
const [dialogComp, dialogMethods] = useDialog({}) 
</script>