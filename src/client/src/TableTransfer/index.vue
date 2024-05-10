<template>
    <TableTransfer v-model="value" :columns :api rowKey="userId" ></TableTransfer>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
import { TableTransfer } from '@/components'
const value = ref([])
const columns = [
    // {
    //     label: 'aa',
    //     childrenColumns: [
    //         { prop: 'aa', label: 'aa' },
    //         { prop: 'bb', label: 'bb' }
    //     ]
    // }, 
    { prop: 'userName', label: 'userName' },
    { prop: 'userId', label: 'userId' }
]
const api = () => {
    console.log('请求所有user接口')
    return {
        rows: [
            { userId: '李四', userName: '李四' },
            { userId: `张三`, userName: '张三' },
        ],
        total: 2
    }
}

</script>