// vite.config.ts
import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "file:///E:/desktop/%E7%BB%83%E4%B9%A0/ttz-ui/node_modules/vite/dist/node/index.js";
import vue from "file:///E:/desktop/%E7%BB%83%E4%B9%A0/ttz-ui/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import vueJsx from "file:///E:/desktop/%E7%BB%83%E4%B9%A0/ttz-ui/node_modules/@vitejs/plugin-vue-jsx/dist/index.mjs";
import dts from "file:///E:/desktop/%E7%BB%83%E4%B9%A0/ttz-ui/node_modules/vite-plugin-dts/dist/index.mjs";
import { resolve } from "path";
import AutoImport from "file:///E:/desktop/%E7%BB%83%E4%B9%A0/ttz-ui/node_modules/unplugin-auto-import/dist/vite.js";
import Components from "file:///E:/desktop/%E7%BB%83%E4%B9%A0/ttz-ui/node_modules/unplugin-vue-components/dist/vite.js";
import { ElementPlusResolver } from "file:///E:/desktop/%E7%BB%83%E4%B9%A0/ttz-ui/node_modules/unplugin-vue-components/dist/resolvers.js";
var __vite_injected_original_dirname = "E:\\desktop\\\u7EC3\u4E60\\ttz-ui";
var __vite_injected_original_import_meta_url = "file:///E:/desktop/%E7%BB%83%E4%B9%A0/ttz-ui/vite.config.ts";
var vite_config_default = defineConfig({
  server: {
    host: true
  },
  plugins: [
    dts({
      tsconfigPath: "tsconfig.app.json",
      exclude: ["src/client/**/*"],
      insertTypesEntry: true,
      copyDtsFiles: true
    }),
    vue(),
    vueJsx(),
    AutoImport({
      resolvers: [ElementPlusResolver()]
    }),
    Components({
      resolvers: [ElementPlusResolver()],
      include: [/\.vue$/, /\.tsx?$/]
    })
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", __vite_injected_original_import_meta_url))
    }
  },
  build: {
    // 到处文件目录，penk-ui 用于存放package.json，避免被覆盖
    // 这里不设置也是默认dist
    outDir: "dist",
    // 兼容
    target: "es2020",
    lib: {
      // Could also be a dictionary or array of multiple entry points
      entry: resolve(__vite_injected_original_dirname, "src/index.ts"),
      name: "TTZUI",
      // the proper extensions will be added
      // 如果不用format文件后缀可能会乱
      fileName: (format) => `ttz-ui.${format}.js`
    },
    rollupOptions: {
      // 确保外部化处理那些你不想打包进库的依赖
      external: ["vue", "element-plus"]
      // output: {
      //   // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
      //   globals: {
      //     "vue": "Vue",
      //     "element-plus": "ElementPlus",
      //   },
      // },
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJFOlxcXFxkZXNrdG9wXFxcXFx1N0VDM1x1NEU2MFxcXFx0dHotdWlcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkU6XFxcXGRlc2t0b3BcXFxcXHU3RUMzXHU0RTYwXFxcXHR0ei11aVxcXFx2aXRlLmNvbmZpZy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vRTovZGVza3RvcC8lRTclQkIlODMlRTQlQjklQTAvdHR6LXVpL3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHsgZmlsZVVSTFRvUGF0aCwgVVJMIH0gZnJvbSBcIm5vZGU6dXJsXCI7XHJcblxyXG5pbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tIFwidml0ZVwiO1xyXG5pbXBvcnQgdnVlIGZyb20gXCJAdml0ZWpzL3BsdWdpbi12dWVcIjtcclxuaW1wb3J0IHZ1ZUpzeCBmcm9tIFwiQHZpdGVqcy9wbHVnaW4tdnVlLWpzeFwiO1xyXG5pbXBvcnQgZHRzIGZyb20gXCJ2aXRlLXBsdWdpbi1kdHNcIjtcclxuaW1wb3J0IHsgcmVzb2x2ZSB9IGZyb20gXCJwYXRoXCI7XHJcbmltcG9ydCBBdXRvSW1wb3J0IGZyb20gXCJ1bnBsdWdpbi1hdXRvLWltcG9ydC92aXRlXCI7XHJcbmltcG9ydCBDb21wb25lbnRzIGZyb20gXCJ1bnBsdWdpbi12dWUtY29tcG9uZW50cy92aXRlXCI7XHJcbmltcG9ydCB7IEVsZW1lbnRQbHVzUmVzb2x2ZXIgfSBmcm9tIFwidW5wbHVnaW4tdnVlLWNvbXBvbmVudHMvcmVzb2x2ZXJzXCI7XHJcbi8vIGh0dHBzOi8vdml0ZWpzLmRldi9jb25maWcvXHJcbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XHJcbiAgc2VydmVyOiB7XHJcbiAgICBob3N0OiB0cnVlLFxyXG4gIH0sXHJcbiAgcGx1Z2luczogW1xyXG4gICAgZHRzKHtcclxuICAgICAgdHNjb25maWdQYXRoOiBcInRzY29uZmlnLmFwcC5qc29uXCIsXHJcbiAgICAgIGV4Y2x1ZGU6IFtcInNyYy9jbGllbnQvKiovKlwiXSxcclxuICAgICAgaW5zZXJ0VHlwZXNFbnRyeTogdHJ1ZSxcclxuICAgICAgY29weUR0c0ZpbGVzOiB0cnVlLFxyXG4gICAgfSksXHJcbiAgICB2dWUoKSxcclxuICAgIHZ1ZUpzeCgpLFxyXG4gICAgQXV0b0ltcG9ydCh7XHJcbiAgICAgIHJlc29sdmVyczogW0VsZW1lbnRQbHVzUmVzb2x2ZXIoKV0sXHJcbiAgICB9KSxcclxuICAgIENvbXBvbmVudHMoe1xyXG4gICAgICByZXNvbHZlcnM6IFtFbGVtZW50UGx1c1Jlc29sdmVyKCldLFxyXG4gICAgICBpbmNsdWRlOiBbL1xcLnZ1ZSQvLCAvXFwudHN4PyQvXSxcclxuICAgIH0pLFxyXG4gIF0sXHJcbiAgcmVzb2x2ZToge1xyXG4gICAgYWxpYXM6IHtcclxuICAgICAgXCJAXCI6IGZpbGVVUkxUb1BhdGgobmV3IFVSTChcIi4vc3JjXCIsIGltcG9ydC5tZXRhLnVybCkpLFxyXG4gICAgfSxcclxuICB9LFxyXG4gIGJ1aWxkOiB7XHJcbiAgICAvLyBcdTUyMzBcdTU5MDRcdTY1ODdcdTRFRjZcdTc2RUVcdTVGNTVcdUZGMENwZW5rLXVpIFx1NzUyOFx1NEU4RVx1NUI1OFx1NjUzRXBhY2thZ2UuanNvblx1RkYwQ1x1OTA3Rlx1NTE0RFx1ODhBQlx1ODk4Nlx1NzZENlxyXG4gICAgLy8gXHU4RkQ5XHU5MUNDXHU0RTBEXHU4QkJFXHU3RjZFXHU0RTVGXHU2NjJGXHU5RUQ4XHU4QkE0ZGlzdFxyXG4gICAgb3V0RGlyOiBcImRpc3RcIixcclxuICAgIC8vIFx1NTE3Q1x1NUJCOVxyXG4gICAgdGFyZ2V0OiBcImVzMjAyMFwiLFxyXG4gICAgbGliOiB7XHJcbiAgICAgIC8vIENvdWxkIGFsc28gYmUgYSBkaWN0aW9uYXJ5IG9yIGFycmF5IG9mIG11bHRpcGxlIGVudHJ5IHBvaW50c1xyXG4gICAgICBlbnRyeTogcmVzb2x2ZShfX2Rpcm5hbWUsIFwic3JjL2luZGV4LnRzXCIpLFxyXG4gICAgICBuYW1lOiBcIlRUWlVJXCIsXHJcbiAgICAgIC8vIHRoZSBwcm9wZXIgZXh0ZW5zaW9ucyB3aWxsIGJlIGFkZGVkXHJcbiAgICAgIC8vIFx1NTk4Mlx1Njc5Q1x1NEUwRFx1NzUyOGZvcm1hdFx1NjU4N1x1NEVGNlx1NTQwRVx1N0YwMFx1NTNFRlx1ODBGRFx1NEYxQVx1NEU3MVxyXG4gICAgICBmaWxlTmFtZTogKGZvcm1hdCkgPT4gYHR0ei11aS4ke2Zvcm1hdH0uanNgLFxyXG4gICAgfSxcclxuICAgIHJvbGx1cE9wdGlvbnM6IHtcclxuICAgICAgLy8gXHU3ODZFXHU0RkREXHU1OTE2XHU5MEU4XHU1MzE2XHU1OTA0XHU3NDA2XHU5MEEzXHU0RTlCXHU0RjYwXHU0RTBEXHU2MEYzXHU2MjUzXHU1MzA1XHU4RkRCXHU1RTkzXHU3Njg0XHU0RjlEXHU4RDU2XHJcbiAgICAgIGV4dGVybmFsOiBbXCJ2dWVcIiwgXCJlbGVtZW50LXBsdXNcIl0sXHJcbiAgICAgIC8vIG91dHB1dDoge1xyXG4gICAgICAvLyAgIC8vIFx1NTcyOCBVTUQgXHU2Nzg0XHU1RUZBXHU2QTIxXHU1RjBGXHU0RTBCXHU0RTNBXHU4RkQ5XHU0RTlCXHU1OTE2XHU5MEU4XHU1MzE2XHU3Njg0XHU0RjlEXHU4RDU2XHU2M0QwXHU0RjlCXHU0RTAwXHU0RTJBXHU1MTY4XHU1QzQwXHU1M0Q4XHU5MUNGXHJcbiAgICAgIC8vICAgZ2xvYmFsczoge1xyXG4gICAgICAvLyAgICAgXCJ2dWVcIjogXCJWdWVcIixcclxuICAgICAgLy8gICAgIFwiZWxlbWVudC1wbHVzXCI6IFwiRWxlbWVudFBsdXNcIixcclxuICAgICAgLy8gICB9LFxyXG4gICAgICAvLyB9LFxyXG4gICAgfSxcclxuICB9LFxyXG59KTtcclxuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUFzUSxTQUFTLGVBQWUsV0FBVztBQUV6UyxTQUFTLG9CQUFvQjtBQUM3QixPQUFPLFNBQVM7QUFDaEIsT0FBTyxZQUFZO0FBQ25CLE9BQU8sU0FBUztBQUNoQixTQUFTLGVBQWU7QUFDeEIsT0FBTyxnQkFBZ0I7QUFDdkIsT0FBTyxnQkFBZ0I7QUFDdkIsU0FBUywyQkFBMkI7QUFUcEMsSUFBTSxtQ0FBbUM7QUFBOEcsSUFBTSwyQ0FBMkM7QUFXeE0sSUFBTyxzQkFBUSxhQUFhO0FBQUEsRUFDMUIsUUFBUTtBQUFBLElBQ04sTUFBTTtBQUFBLEVBQ1I7QUFBQSxFQUNBLFNBQVM7QUFBQSxJQUNQLElBQUk7QUFBQSxNQUNGLGNBQWM7QUFBQSxNQUNkLFNBQVMsQ0FBQyxpQkFBaUI7QUFBQSxNQUMzQixrQkFBa0I7QUFBQSxNQUNsQixjQUFjO0FBQUEsSUFDaEIsQ0FBQztBQUFBLElBQ0QsSUFBSTtBQUFBLElBQ0osT0FBTztBQUFBLElBQ1AsV0FBVztBQUFBLE1BQ1QsV0FBVyxDQUFDLG9CQUFvQixDQUFDO0FBQUEsSUFDbkMsQ0FBQztBQUFBLElBQ0QsV0FBVztBQUFBLE1BQ1QsV0FBVyxDQUFDLG9CQUFvQixDQUFDO0FBQUEsTUFDakMsU0FBUyxDQUFDLFVBQVUsU0FBUztBQUFBLElBQy9CLENBQUM7QUFBQSxFQUNIO0FBQUEsRUFDQSxTQUFTO0FBQUEsSUFDUCxPQUFPO0FBQUEsTUFDTCxLQUFLLGNBQWMsSUFBSSxJQUFJLFNBQVMsd0NBQWUsQ0FBQztBQUFBLElBQ3REO0FBQUEsRUFDRjtBQUFBLEVBQ0EsT0FBTztBQUFBO0FBQUE7QUFBQSxJQUdMLFFBQVE7QUFBQTtBQUFBLElBRVIsUUFBUTtBQUFBLElBQ1IsS0FBSztBQUFBO0FBQUEsTUFFSCxPQUFPLFFBQVEsa0NBQVcsY0FBYztBQUFBLE1BQ3hDLE1BQU07QUFBQTtBQUFBO0FBQUEsTUFHTixVQUFVLENBQUMsV0FBVyxVQUFVLE1BQU07QUFBQSxJQUN4QztBQUFBLElBQ0EsZUFBZTtBQUFBO0FBQUEsTUFFYixVQUFVLENBQUMsT0FBTyxjQUFjO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxJQVFsQztBQUFBLEVBQ0Y7QUFDRixDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
