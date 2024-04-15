import { isPlainObject, isUndefined } from "lodash";
import { unref, watch, type ModelRef } from "vue";
import type { EmitEvent, GetProps } from "../../types";
import { useLocalModel } from "@/utils";

export function useData(
  getProps: GetProps,
  emitEvent: EmitEvent,
  modelValue: ModelRef<Recordable, string>
) {
  const { defaultValue = {} } = unref(getProps);
  const { setFieldsValue, getFieldsValue, setValue, getValue } =
    useLocalModel(modelValue);
  /**
   * 初始值
   */
  if (isPlainObject(defaultValue)) {
    if (isUndefined(unref(modelValue))) {
      setValue(defaultValue);
    }
  } else {
    console.warn(
      `表单属性"defaultValue",期望PlainObject,得到${typeof defaultValue}`,
      defaultValue
    );
  }
  watch(
    getValue,
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
    setFormData: setValue,
    getFormData: getValue,
  };
}
