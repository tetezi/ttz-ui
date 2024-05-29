<template>
    <div>
        <el-row>
            <el-col :span="3">
                <PreinstallFormSchemas> </PreinstallFormSchemas>
            </el-col>
            <el-col :span="12">
                <FormComp :isDesign='true' :isDesignFormSchema="true"  :formSchemas="formSchemas"
                    style="height: 100%;border: 1px solid black;">
                </FormComp>
            </el-col>
            <el-col :span="9">
                <Input @change="handleSelectSchame" /> 
                <FormSchemaConfig ref="FormSchemaConfigInstance" @submit="handleSubmit"></FormSchemaConfig>  
            </el-col>
        </el-row>


    </div>
</template>
<script lang="ts" setup>
import { useLocalProps, } from '@/utils';
import { useForm, } from '@/components';
import { computed, ref, unref, } from 'vue';
import type { DynamicFormDesignerProps, DynamicFormDesignerShortEvent } from './type';
import PreinstallFormSchemas from './components/PreinstallFormSchemas.vue' ;
import FormSchemaConfig from './components/FormSchemaConfig.vue';
import {CodeEdit} from '@/components';
import type { DesignFormSchema, FormSchemas } from '@/components/BasicForm/src/types';
const test = ref('www')
const props = defineProps<DynamicFormDesignerProps>()
const emit = defineEmits<DynamicFormDesignerShortEvent>()
const FormSchemaConfigInstance = ref()
const { getProps, setProps, emitEvent } = useLocalProps<DynamicFormDesignerProps, DynamicFormDesignerShortEvent, {}>(props, emit)
const [FormComp, formMethods] = useForm({})
const formSchemas = ref<DesignFormSchema[]>([])
const selectedSchameKey = ref('')
function handleSelectSchame(key) {
    selectedSchameKey.value = key
    unref(FormSchemaConfigInstance).setValue(formMethods.getSchema(key))
}
function handleSubmit(value) {
    formMethods.updateSchema(unref(selectedSchameKey), value)
} 
</script>
