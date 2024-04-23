import type { Recordable } from "@/global";
import { useApi } from "@/utils";
import {
  ref,
  toValue,
  unref,
  watch,
  type ComputedRef,
  type MaybeRefOrGetter,
} from "vue";
import { get, isArray, isFunction, isNumber } from "lodash";
import type { TableBind } from "../..";
import type { GetTableProps } from "../types";

export function useTableApi<Data extends Recordable>(
  getProps: GetTableProps<Data>,
  setProps,
  setModelValue,
  { pageSizeRef, currentPageRef, totalRef }
) {
  const isRunning = ref(false);

  async function fetch(params?: MaybeRefOrGetter<Recordable>) {
    const { api, listField, totalField, pageConfigs, beforeFetch } =
      unref(getProps);
    if (!api || !isFunction(api)) return [];
    let apiParams = toValue(params);

    if (beforeFetch) {
      apiParams = await beforeFetch(apiParams);
    }
    setProps({ loading: true });
    try {
      const res = await api(apiParams);
      let data;
      let total;
      if (listField === "") {
        data = res;
        total = res.length;
      } else {
        data = get(res, listField);
        total = get(res, totalField);
      }
      data = isArray(data) ? data : [];
      totalRef.value = isNumber(total) ? total : 0;
      setModelValue(data);
      return data;
    } catch (err) {
      setModelValue([]);
      totalRef.value = 0;
      return Promise.reject(err);
    } finally {
      setProps({ loading: false });
    }
  }
  async function reload(param: MaybeRefOrGetter<Recordable> = {}) {
    if (!isRunning.value) {
      isRunning.value = true;
    }
    const { pageConfigs } = unref(getProps);
    let apiParams = param;
    if (pageConfigs) {
      const { pageSizeField = "pageSize", currentPageField = "pageIndex" } =
        pageConfigs;
      apiParams = {
        [pageSizeField]: unref(pageSizeRef),
        [currentPageField]: unref(currentPageRef),
        ...apiParams,
      };
    }
    apiParams = {
      ...(unref(unref(getProps).params) || {}),
      ...apiParams,
    };
    return fetch(apiParams);
  }
  watch(
    [() => unref(unref(getProps).params), currentPageRef, pageSizeRef],
    () => {
      if (isRunning.value) {
        reload();
      }
    }
  );
  watch(
    () => unref(getProps).immediate,
    (immediate) => {
      if (immediate) {
        reload();
      }
    },
    { immediate: true }
  );
  return { fetch, reload };
  // useApi({
  //     api: (params: Params) => any;
  //     resultField?: PropertyPath | undefined;
  //     immediate?: boolean | undefined;
  //     defaultData?: Data | undefined;
  //     beforeFetch?: ((params: unknown) => MaybePromise<...>) | undefined;
  //     afterFetch?: ((data: unknown) => MaybePromise<...>) | undefined;
  //     onChangeData?: ((data: Data | undefined) => void) | undefined;
  //     onInit?: ((data: Data) => void) | undefined;
  // },paramsRef)
}
