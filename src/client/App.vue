<template>
  <el-config-provider :locale="zhCn">
    <div v-for="{ name, component } of demoList" :key="name">
      <div>{{ name }}</div>
      <component :is="component"></component>
    </div>
  </el-config-provider>
</template>
<script lang="ts" setup>
import { zhCn } from 'element-plus/es/locales.mjs';
import { shallowRef,unref, type DefineComponent } from 'vue';
const demoFiles: Recordable<{
  default: DefineComponent;
}> = import.meta.glob("@/client/src/*/index.vue", { eager: true });
const demoList = shallowRef<{ name: string, component: DefineComponent }[]>([])
for (const key in demoFiles) {
  if (demoFiles[key].default) {
    const name = key.match(/demo\/(.*?)\/index\.vue$/)?.[1] || '';
    demoList.value.push({
      name,
      component: demoFiles[key].default
    })
  }
}
console.log(unref(demoList))
</script>