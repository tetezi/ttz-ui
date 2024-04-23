import type { Recordable } from "@/global";
import { chunk, isUndefined } from "lodash";
import { ref, unref, computed, watchEffect, type ComputedRef } from "vue";
import type { GetTableProps } from "../types";

export function usePage<Data extends Recordable>(
  getProps: GetTableProps<Data>,
  getTableData: ComputedRef<Data[] | undefined>
) {
  const currentPageRef = ref(1);
  const pageSizeRef = ref(10);
  const totalRef = ref(0);
  const pageType = computed(() => {
    if (unref(getProps).pageConfigs === false) {
      return false;
    } else {
      return isUndefined(unref(getProps).api) ? "local" : "api";
    }
  });
  watchEffect(() => {
    if (unref(pageType) === "local") {
      totalRef.value = (unref(getTableData) || []).length;
    }
  });
  watchEffect(() => {
    const pageConfigs = unref(getProps).pageConfigs;
    if (pageConfigs) {
      pageSizeRef.value = pageConfigs.pageSize || 10;
    }
  });
  /** 渲染到el表格的数据
   * 本地模式时根据分页截断 */
  const getPageData: ComputedRef<Data[]> = computed(() => {
    return unref(pageType) === "local"
      ? chunk(unref(getTableData) || [], unref(pageSizeRef))[
          unref(currentPageRef) - 1
        ]
      : unref(getTableData) || [];
  });
  function GetPaginationVNode() {
    const { pageConfigs } = unref(getProps);
    const bind = {
      "total": unref(totalRef),
      "background": true,
      "pagerCount": 5,
      "pageSizes": [10, 20, 30, 50, 100],
      "small": true,
      "layout": pageConfigs ? pageConfigs.pageLayout : undefined,
      "currentPage": unref(currentPageRef),
      "pageSize": unref(pageSizeRef),
      "onUpdate:currentPage": (v) => {
        currentPageRef.value = v;
      },
      "onUpdate:pageSize": (v) => {
        pageSizeRef.value = v;
      },
    };
    return unref(pageType) === false ? undefined : <el-pagination {...bind} />;
  }
  return {
    GetPaginationVNode,
    getPageData,

    pageSizeRef,
    totalRef,
    currentPageRef,
  };
}
