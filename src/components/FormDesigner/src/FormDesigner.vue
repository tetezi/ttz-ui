<template>
    <div> 
        <el-row>
            <el-col :span="3">
                <PreinstallFormSchemas> </PreinstallFormSchemas>
            </el-col>
            <el-col :span="18">
                <FormComp :isDesign='true' :isDesignFormSchema="true" v-model:formSchemas="formSchemas"
                    style="height: 100%;border: 1px solid black;">
                </FormComp>
            </el-col>
            <el-col :span="3"> </el-col>
        </el-row>


    </div>
</template>
<script lang="ts" setup>
import { useLocalProps, } from '@/utils';
import { useForm, } from '@/components';
import { ref, } from 'vue';
import type { DynamicFormDesignerProps, DynamicFormDesignerShortEvent } from './type';
import PreinstallFormSchemas from './components/PreinstallFormSchemas.vue';
import type { DesignFormSchema, FormSchemas } from '@/components/BasicForm/src/types';
const props = defineProps<DynamicFormDesignerProps>()
const emit = defineEmits<DynamicFormDesignerShortEvent>()
const { getProps, setProps, emitEvent } = useLocalProps<DynamicFormDesignerProps, DynamicFormDesignerShortEvent, {}>(props, emit)
const [FormComp, formMethods] = useForm((() => ({
})))
const formSchemas = ref<DesignFormSchema[]>([
 
])
</script>
