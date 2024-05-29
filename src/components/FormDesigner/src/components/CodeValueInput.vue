<template>
    <div style=" width:100%">
        <FormComp v-model="modelValue">
        </FormComp>
    </div>

</template>
<script lang="tsx" setup>
import { computed, markRaw, onMounted, ref, unref, } from 'vue';
import { omit } from 'lodash'
import { getInheritanceEvent } from '@/utils';
import { useForm } from '@/components/BasicForm';
import { CodeEdit } from '@/components';
type ShortEvent = {}
type Props = {
}
const defaultProps = {}
const props = withDefaults(defineProps<Props>(), {})
const emit = defineEmits<ShortEvent>()
const modelValue = defineModel<{ type: 'code' | 'value', code?: string, value?: string }>()

const slots = defineSlots()
const [FormComp] = useForm({
    formSchemas: [
        {
            labelShow: false,
            field: 'type', label: '类型', component: 'Radio', componentProps: {
                options: [
                    { label: 'value', value: 'value' },
                    { label: 'code', value: 'code' },
                ], isButton: true
            }
        },
        {
            labelShow: false, field: 'code', label: '代码', ifShow: ({ formValue }) => formValue.type == 'code',
            component: () => CodeEdit,
            componentStyle: {
                height: '150px'
            }
        },
        { labelShow: false, field: 'value', label: '值', ifShow: ({ formValue }) => formValue.type == 'value', component: 'Input', },
    ],
})

</script>