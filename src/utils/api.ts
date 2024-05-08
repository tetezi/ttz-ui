import type { MaybePromise, Recordable } from "@/global";
import { get, isFunction, type PropertyPath } from "lodash";
import {
  toValue,
  type MaybeRefOrGetter,
  computed,
  unref,
  ref,
  watch,
  type Ref,
  readonly,
} from "vue";

type UseApiConfig<Params, Data> = {
  api: (params: Params) => MaybePromise<any>;
  resultField?: PropertyPath;
  immediate?: boolean;
  defaultData?: Data;
  beforeFetch?: (params: unknown) => MaybePromise<Params>;
  afterFetch?: (data: unknown) => MaybePromise<Data>;
  onChangeData?: (data: Data | undefined) => void;
  onInit?: (data: Data) => void;
};
export function useApi<Params extends Recordable, Data = any>(
  apiConfig: MaybeRefOrGetter<UseApiConfig<Params, Data>>,
  paramsRef: MaybeRefOrGetter<Params>
) {
  const configRef = computed(() => {
    return toValue(apiConfig);
  });
  /**
   * 是否获取数据中
   */
  const loadingRef = ref(false);
  /**
   * 是否获取数据失败
   */
  const errorRef = ref(false);
  /**
   * 是否运行中
   */
  const isRunningRef = ref(false);
  /**
   * 响应性数据
   */
  const dataRef = ref(unref(configRef).defaultData) as Ref<Data | undefined>;
  function setData(data?: Data) {
    dataRef.value = data;
    unref(configRef)?.onChangeData?.(data);
  }
  /** 请求 */
  async function fetch(params: Params = toValue(paramsRef)) {
    const {
      api,
      defaultData,
      resultField = "",
      afterFetch,
      beforeFetch,
    } = unref(configRef);
    if (!isFunction(api)) return Promise.reject();
    loadingRef.value = true;
    isRunningRef.value = true;
    const actualParams = beforeFetch ? await beforeFetch(params) : params;
    const res = await Promise.resolve(api(actualParams))
      .catch((err: any) => {
        setData(defaultData);
        errorRef.value = true;
        return Promise.reject(err);
      })
      .finally(() => {
        loadingRef.value = false;
      });
    errorRef.value = false;
    let data = resultField ? get(res, resultField) : res;
    data = afterFetch ? await afterFetch(data) : data;
    setData(data);
    return data;
  }
  /**
   * 初始化
   */
  async function init() {
    const data = await fetch();
    unref(configRef)?.onInit?.(data);
  }
  /**自启动 */
  watch(
    [() => unref(configRef).api, () => unref(configRef).immediate],
    () => {
      if (unref(configRef).immediate) {
        init();
      }
    },
    { immediate: true }
  );
  /**侦听参数变动 */
  watch(
    () => toValue(paramsRef),
    () => {
      if (unref(isRunningRef)) {
        fetch();
      }
    },
    {
      deep: true,
    }
  );
  return {
    init,
    fetch,
    setData,
    dataRef: readonly(dataRef) as Ref<Data | undefined>,
    errorRef: readonly(errorRef) as Ref<boolean>,
    loadingRef: readonly(loadingRef) as Ref<boolean>,
    isRunningRef: readonly(isRunningRef) as Ref<boolean>,
  };
}
