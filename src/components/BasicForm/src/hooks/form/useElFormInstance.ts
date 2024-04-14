import { unref, ref, type ComponentInstance } from "vue";
import type { GetElFormInstance, Validate, ValidateField } from "../../types";
import type { FormInstance } from "element-plus";
import { type PropertyPath } from "lodash";
import type FormItem from "../../FormItem.vue";

export function useElFormInstance() {
  /**
   * eleement表单实例
   */
  const elFormInstanceRef = ref<null | FormInstance>(null);
  const getElFormInstance: GetElFormInstance = function () {
    const el = unref(elFormInstanceRef);
    if (el) {
      return el;
    } else {
      throw new Error("表单实例未创建完成");
    }
  };
  const validate: Validate = function () {
    return getElFormInstance()
      .validate()
      .then(() => {})
      .catch((error) => {
        return Promise.reject(error);
      });
  };
  const validateField: ValidateField = function (props) {
    return getElFormInstance()
      .validateField(props as any)
      .then(() => {})
      .catch((error) => {
        return Promise.reject(error);
      });
  };
  const resetFields: FormInstance["resetFields"] = (...arg: any) =>
    getElFormInstance().resetFields(...arg);

  const scrollToField: FormInstance["scrollToField"] = (...arg: any) =>
    (getElFormInstance().scrollToField as any)(...arg);

  const clearValidate: FormInstance["clearValidate"] = (...arg: any) =>
    getElFormInstance().clearValidate(...arg);
  /**
   * formItem组件实例对象，键名为转string类型的子项field字段
   */
  const formItemInstance = ref<
    Recordable<undefined | ComponentInstance<typeof FormItem>>
  >({});
  /**
   * 装卸载formItem组件回调，使formItemInstance绑定于formItem组件实例对象
   */
  const setFormItemInstanceRef = function (
    field: string,
    el: ComponentInstance<typeof FormItem>
  ) {
    if (el) {
      formItemInstance.value[String(field)] = el;
    } else {
      formItemInstance.value[String(field)] = undefined;
    }
  };
  /**
   * 获取对应字段属性的formItem组件实例
   */
  const getFormItemInstance = function (field: PropertyPath) {
    return formItemInstance.value[String(field)];
  };
  return {
    getElFormInstance,
    elFormInstanceRef,
    validate,
    validateField,
    resetFields,
    scrollToField,
    clearValidate,
    setFormItemInstanceRef,
    getFormItemInstance,
  };
}
