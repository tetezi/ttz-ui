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
      external: [
        "vue",
        "element-plus",
        "vuedraggable",
        "monaco-editor",
        "lodash",
        "uuid"
      ]
      // output: {
      //   // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
      //   globals: {
      //     "vue": "Vue",
      //     "element-plus": "ElementPlus",
      //     "vuedraggable": "Vuedraggable",
      //   },
      // },
    }
  }
  // // 强制预构建插件包
  // optimizeDeps: {
  //   include: [
  //     `monaco-editor/esm/vs/language/json/json.worker`,
  //     `monaco-editor/esm/vs/language/css/css.worker`,
  //     `monaco-editor/esm/vs/language/html/html.worker`,
  //     `monaco-editor/esm/vs/language/typescript/ts.worker`,
  //     `monaco-editor/esm/vs/editor/editor.worker`,
  //   ],
  // },
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJFOlxcXFxkZXNrdG9wXFxcXFx1N0VDM1x1NEU2MFxcXFx0dHotdWlcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkU6XFxcXGRlc2t0b3BcXFxcXHU3RUMzXHU0RTYwXFxcXHR0ei11aVxcXFx2aXRlLmNvbmZpZy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vRTovZGVza3RvcC8lRTclQkIlODMlRTQlQjklQTAvdHR6LXVpL3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHsgZmlsZVVSTFRvUGF0aCwgVVJMIH0gZnJvbSBcIm5vZGU6dXJsXCI7XHJcblxyXG5pbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tIFwidml0ZVwiO1xyXG5pbXBvcnQgdnVlIGZyb20gXCJAdml0ZWpzL3BsdWdpbi12dWVcIjtcclxuaW1wb3J0IHZ1ZUpzeCBmcm9tIFwiQHZpdGVqcy9wbHVnaW4tdnVlLWpzeFwiO1xyXG5pbXBvcnQgZHRzIGZyb20gXCJ2aXRlLXBsdWdpbi1kdHNcIjtcclxuaW1wb3J0IHsgcmVzb2x2ZSB9IGZyb20gXCJwYXRoXCI7XHJcbmltcG9ydCBBdXRvSW1wb3J0IGZyb20gXCJ1bnBsdWdpbi1hdXRvLWltcG9ydC92aXRlXCI7XHJcbmltcG9ydCBDb21wb25lbnRzIGZyb20gXCJ1bnBsdWdpbi12dWUtY29tcG9uZW50cy92aXRlXCI7XHJcbmltcG9ydCB7IEVsZW1lbnRQbHVzUmVzb2x2ZXIgfSBmcm9tIFwidW5wbHVnaW4tdnVlLWNvbXBvbmVudHMvcmVzb2x2ZXJzXCI7XHJcbi8vIGh0dHBzOi8vdml0ZWpzLmRldi9jb25maWcvXHJcbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7IFxyXG4gIHNlcnZlcjoge1xyXG4gICAgaG9zdDogdHJ1ZSxcclxuICB9LFxyXG4gIHBsdWdpbnM6IFtcclxuICAgIGR0cyh7XHJcbiAgICAgIHRzY29uZmlnUGF0aDogXCJ0c2NvbmZpZy5hcHAuanNvblwiLFxyXG4gICAgICBleGNsdWRlOiBbXCJzcmMvY2xpZW50LyoqLypcIl0sXHJcbiAgICAgIGluc2VydFR5cGVzRW50cnk6IHRydWUsXHJcbiAgICAgIGNvcHlEdHNGaWxlczogdHJ1ZSxcclxuICAgIH0pLFxyXG4gICAgdnVlKCksXHJcbiAgICB2dWVKc3goKSxcclxuICAgIEF1dG9JbXBvcnQoe1xyXG4gICAgICByZXNvbHZlcnM6IFtFbGVtZW50UGx1c1Jlc29sdmVyKCldLFxyXG4gICAgfSksXHJcbiAgICBDb21wb25lbnRzKHtcclxuICAgICAgcmVzb2x2ZXJzOiBbRWxlbWVudFBsdXNSZXNvbHZlcigpXSxcclxuICAgICAgaW5jbHVkZTogWy9cXC52dWUkLywgL1xcLnRzeD8kL10sXHJcbiAgICB9KSxcclxuICBdLFxyXG4gIHJlc29sdmU6IHtcclxuICAgIGFsaWFzOiB7XHJcbiAgICAgIFwiQFwiOiBmaWxlVVJMVG9QYXRoKG5ldyBVUkwoXCIuL3NyY1wiLCBpbXBvcnQubWV0YS51cmwpKSxcclxuICAgIH0sXHJcbiAgfSxcclxuICBidWlsZDoge1xyXG4gICAgLy8gXHU1MjMwXHU1OTA0XHU2NTg3XHU0RUY2XHU3NkVFXHU1RjU1XHVGRjBDcGVuay11aSBcdTc1MjhcdTRFOEVcdTVCNThcdTY1M0VwYWNrYWdlLmpzb25cdUZGMENcdTkwN0ZcdTUxNERcdTg4QUJcdTg5ODZcdTc2RDZcclxuICAgIC8vIFx1OEZEOVx1OTFDQ1x1NEUwRFx1OEJCRVx1N0Y2RVx1NEU1Rlx1NjYyRlx1OUVEOFx1OEJBNGRpc3RcclxuICAgIG91dERpcjogXCJkaXN0XCIsXHJcbiAgICAvLyBcdTUxN0NcdTVCQjlcclxuICAgIHRhcmdldDogXCJlczIwMjBcIixcclxuICAgIGxpYjoge1xyXG4gICAgICAvLyBDb3VsZCBhbHNvIGJlIGEgZGljdGlvbmFyeSBvciBhcnJheSBvZiBtdWx0aXBsZSBlbnRyeSBwb2ludHNcclxuICAgICAgZW50cnk6IHJlc29sdmUoX19kaXJuYW1lLCBcInNyYy9pbmRleC50c1wiKSxcclxuICAgICAgbmFtZTogXCJUVFpVSVwiLFxyXG4gICAgICAvLyB0aGUgcHJvcGVyIGV4dGVuc2lvbnMgd2lsbCBiZSBhZGRlZFxyXG4gICAgICAvLyBcdTU5ODJcdTY3OUNcdTRFMERcdTc1Mjhmb3JtYXRcdTY1ODdcdTRFRjZcdTU0MEVcdTdGMDBcdTUzRUZcdTgwRkRcdTRGMUFcdTRFNzFcclxuICAgICAgZmlsZU5hbWU6IChmb3JtYXQpID0+IGB0dHotdWkuJHtmb3JtYXR9LmpzYCxcclxuICAgIH0sXHJcbiAgICByb2xsdXBPcHRpb25zOiB7XHJcbiAgICAgIC8vIFx1Nzg2RVx1NEZERFx1NTkxNlx1OTBFOFx1NTMxNlx1NTkwNFx1NzQwNlx1OTBBM1x1NEU5Qlx1NEY2MFx1NEUwRFx1NjBGM1x1NjI1M1x1NTMwNVx1OEZEQlx1NUU5M1x1NzY4NFx1NEY5RFx1OEQ1NlxyXG4gICAgICBleHRlcm5hbDogW1xyXG4gICAgICAgIFwidnVlXCIsXHJcbiAgICAgICAgXCJlbGVtZW50LXBsdXNcIixcclxuICAgICAgICBcInZ1ZWRyYWdnYWJsZVwiLFxyXG4gICAgICAgIFwibW9uYWNvLWVkaXRvclwiLFxyXG4gICAgICAgIFwibG9kYXNoXCIsXHJcbiAgICAgICAgXCJ1dWlkXCIsXHJcbiAgICAgIF0sXHJcbiAgICAgIC8vIG91dHB1dDoge1xyXG4gICAgICAvLyAgIC8vIFx1NTcyOCBVTUQgXHU2Nzg0XHU1RUZBXHU2QTIxXHU1RjBGXHU0RTBCXHU0RTNBXHU4RkQ5XHU0RTlCXHU1OTE2XHU5MEU4XHU1MzE2XHU3Njg0XHU0RjlEXHU4RDU2XHU2M0QwXHU0RjlCXHU0RTAwXHU0RTJBXHU1MTY4XHU1QzQwXHU1M0Q4XHU5MUNGXHJcbiAgICAgIC8vICAgZ2xvYmFsczoge1xyXG4gICAgICAvLyAgICAgXCJ2dWVcIjogXCJWdWVcIixcclxuICAgICAgLy8gICAgIFwiZWxlbWVudC1wbHVzXCI6IFwiRWxlbWVudFBsdXNcIixcclxuICAgICAgLy8gICAgIFwidnVlZHJhZ2dhYmxlXCI6IFwiVnVlZHJhZ2dhYmxlXCIsXHJcbiAgICAgIC8vICAgfSxcclxuICAgICAgLy8gfSxcclxuICAgIH0sXHJcbiAgfSxcclxuICAvLyAvLyBcdTVGM0FcdTUyMzZcdTk4ODRcdTY3ODRcdTVFRkFcdTYzRDJcdTRFRjZcdTUzMDVcclxuICAvLyBvcHRpbWl6ZURlcHM6IHtcclxuICAvLyAgIGluY2x1ZGU6IFtcclxuICAvLyAgICAgYG1vbmFjby1lZGl0b3IvZXNtL3ZzL2xhbmd1YWdlL2pzb24vanNvbi53b3JrZXJgLFxyXG4gIC8vICAgICBgbW9uYWNvLWVkaXRvci9lc20vdnMvbGFuZ3VhZ2UvY3NzL2Nzcy53b3JrZXJgLFxyXG4gIC8vICAgICBgbW9uYWNvLWVkaXRvci9lc20vdnMvbGFuZ3VhZ2UvaHRtbC9odG1sLndvcmtlcmAsXHJcbiAgLy8gICAgIGBtb25hY28tZWRpdG9yL2VzbS92cy9sYW5ndWFnZS90eXBlc2NyaXB0L3RzLndvcmtlcmAsXHJcbiAgLy8gICAgIGBtb25hY28tZWRpdG9yL2VzbS92cy9lZGl0b3IvZWRpdG9yLndvcmtlcmAsXHJcbiAgLy8gICBdLFxyXG4gIC8vIH0sXHJcbn0pO1xyXG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQXNRLFNBQVMsZUFBZSxXQUFXO0FBRXpTLFNBQVMsb0JBQW9CO0FBQzdCLE9BQU8sU0FBUztBQUNoQixPQUFPLFlBQVk7QUFDbkIsT0FBTyxTQUFTO0FBQ2hCLFNBQVMsZUFBZTtBQUN4QixPQUFPLGdCQUFnQjtBQUN2QixPQUFPLGdCQUFnQjtBQUN2QixTQUFTLDJCQUEyQjtBQVRwQyxJQUFNLG1DQUFtQztBQUE4RyxJQUFNLDJDQUEyQztBQVd4TSxJQUFPLHNCQUFRLGFBQWE7QUFBQSxFQUMxQixRQUFRO0FBQUEsSUFDTixNQUFNO0FBQUEsRUFDUjtBQUFBLEVBQ0EsU0FBUztBQUFBLElBQ1AsSUFBSTtBQUFBLE1BQ0YsY0FBYztBQUFBLE1BQ2QsU0FBUyxDQUFDLGlCQUFpQjtBQUFBLE1BQzNCLGtCQUFrQjtBQUFBLE1BQ2xCLGNBQWM7QUFBQSxJQUNoQixDQUFDO0FBQUEsSUFDRCxJQUFJO0FBQUEsSUFDSixPQUFPO0FBQUEsSUFDUCxXQUFXO0FBQUEsTUFDVCxXQUFXLENBQUMsb0JBQW9CLENBQUM7QUFBQSxJQUNuQyxDQUFDO0FBQUEsSUFDRCxXQUFXO0FBQUEsTUFDVCxXQUFXLENBQUMsb0JBQW9CLENBQUM7QUFBQSxNQUNqQyxTQUFTLENBQUMsVUFBVSxTQUFTO0FBQUEsSUFDL0IsQ0FBQztBQUFBLEVBQ0g7QUFBQSxFQUNBLFNBQVM7QUFBQSxJQUNQLE9BQU87QUFBQSxNQUNMLEtBQUssY0FBYyxJQUFJLElBQUksU0FBUyx3Q0FBZSxDQUFDO0FBQUEsSUFDdEQ7QUFBQSxFQUNGO0FBQUEsRUFDQSxPQUFPO0FBQUE7QUFBQTtBQUFBLElBR0wsUUFBUTtBQUFBO0FBQUEsSUFFUixRQUFRO0FBQUEsSUFDUixLQUFLO0FBQUE7QUFBQSxNQUVILE9BQU8sUUFBUSxrQ0FBVyxjQUFjO0FBQUEsTUFDeEMsTUFBTTtBQUFBO0FBQUE7QUFBQSxNQUdOLFVBQVUsQ0FBQyxXQUFXLFVBQVUsTUFBTTtBQUFBLElBQ3hDO0FBQUEsSUFDQSxlQUFlO0FBQUE7QUFBQSxNQUViLFVBQVU7QUFBQSxRQUNSO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxNQUNGO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLElBU0Y7QUFBQSxFQUNGO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFXRixDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
