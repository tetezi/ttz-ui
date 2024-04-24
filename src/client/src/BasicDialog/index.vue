<template>
    <el-button @click="v = true"></el-button>
    <BasicDialog v-model="v" title="asd" :bodyRender="aa" :before-close="bef" @close="close">asd
        <template #footer>
            <BasicButton>asasfd</BasicButton>

        </template>
    </BasicDialog>
</template>
<script lang="tsx" setup>
import { ref } from 'vue'
import { BasicDialog } from '@/components'
const v = ref(false)
function aa(a) {
    console.log(a, 'aa')
    return <div style='color:red' onClick={() => a.close(false)}>wg</div>
}
function bef(done) {
    return new Promise(()=>{})
}
function close(){
    console.log('关闭')
}
</script>