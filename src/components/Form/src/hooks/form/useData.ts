import {
  type PropertyPath,
  set,
  get,
  isPlainObject,
  isUndefined,
  clone,
} from "lodash";
import { ref, unref, computed, watch, toRaw, type ModelRef } from "vue";
import type {
  EmitEvent,
  GetFieldsValue,
  GetFormData,
  SetFieldsValue,
  SetFormData,
  GetProps,
} from "../../types";

export function useData(
  getProps: GetProps,
  emitEvent: EmitEvent,
  modelValue: ModelRef<Recordable, string>
) {
  const { defaultValue = {} } = unref(getProps);

  /**
   * 表单数据
   */
  // const formDataRef = ref<Recordable>(defaultValue);
  /**
   * 设置字段值
   */
  const setFieldsValue: SetFieldsValue = function (
    key: PropertyPath,
    value: any
  ) {
    const t = set(unref(modelValue), key, value);
    setFormData(t);
  };
  /**
   * 获取字段值
   */
  const getFieldsValue: GetFieldsValue = function (
    key: PropertyPath,
    value: any
  ) {
    return get(unref(modelValue), key, value);
  };
  /**
   * 设置表单值
   */
  const setFormData: SetFormData = function (data: Recordable) {
    modelValue.value = data;
  };
  /**
   * 表单值只读计算属性
   */
  const getFormData: GetFormData = computed(() => unref(modelValue));
  /**
   * 初始值
   */
  if (isPlainObject(defaultValue)) {
    if (isUndefined(unref(modelValue))) {
      setFormData(defaultValue);
    }
  } else {
    console.warn(
      `表单属性"defaultValue",期望PlainObject,得到${typeof defaultValue}`,
      defaultValue
    );
  }
  watch(
    getFormData,
    (val) => {
      emitEvent("change", val);
    },
    {
      deep: true,
    }
  );
  return {
    setFieldsValue,
    getFieldsValue,
    setFormData,
    getFormData,
  };
}
