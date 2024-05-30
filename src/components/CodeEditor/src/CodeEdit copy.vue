<template>
    <div ref="editorContainer" style="height: 100%;width:100%">
    </div>
</template>
<script lang="tsx" setup>
import { onMounted, ref, unref, watch, } from 'vue';
import type { CodeEditProps, CodeEditShortEvent } from './types'
import { defaultCodeEditProps } from './defaultProps';
import { editor } from 'monaco-editor'
import editorWorker from 'monaco-editor/esm/vs/editor/editor.worker?worker'
import jsonWorker from 'monaco-editor/esm/vs/language/json/json.worker?worker'
import cssWorker from 'monaco-editor/esm/vs/language/css/css.worker?worker'
import htmlWorker from 'monaco-editor/esm/vs/language/html/html.worker?worker'
import tsWorker from 'monaco-editor/esm/vs/language/typescript/ts.worker?worker'
const props = withDefaults(defineProps<CodeEditProps>(), defaultCodeEditProps)
const emit = defineEmits<CodeEditShortEvent>()
const modelValue = defineModel<string>()
const editorContainer = ref<HTMLElement | null>(null)
let editInstance
// monaco.languages.typescript.javascriptDefaults.addExtraLib(`const val = '1'`);
// monaco.languages.typescript.typescriptDefaults.addExtraLib(`type a = '1'`);
onMounted(() => {
    self.MonacoEnvironment = {
        getWorker(_, label) {
            if (label === 'json') {
                return new jsonWorker()
            }
            if (label === 'css' || label === 'scss' || label === 'less') {
                return new cssWorker()
            }
            if (label === 'html' || label === 'handlebars' || label === 'razor') {
                return new htmlWorker()
            }
            if (label === 'typescript' || label === 'javascript') {
                return new tsWorker()
            }
            return new editorWorker()
        }
    }

    editInstance = editor.create(unref(editorContainer) as HTMLElement, {
        value: unref(modelValue), // 编辑器的值
        language: props.language, //语言
        theme: 'vs-dark', // 编辑器主题：vs, hc-black, or vs-dark
        // autoIndent: true, // 自动缩进
        readOnly: false, // 是否只读 
    });
    // 监听编辑器的内容修改事件 
    editInstance.onDidChangeModelContent((event) => {
        const newValue = unref(editInstance).getValue()
        modelValue.value = newValue;
    });
    watch(modelValue, (newValue) => {
        if ((editInstance).getValue() !== newValue) {
            editInstance.setValue(newValue);
        }
    })
})
</script>