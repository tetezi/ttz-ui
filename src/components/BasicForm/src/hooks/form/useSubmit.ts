import { ref, unref } from "vue";
import type {
  GetProps,
  EmitEvent,
  Validate,
  SubmitFunction,
} from "../../types";
import type { GetModelValue } from "@/utils";

export function useSubmit(
  getProps: GetProps,
  emitEvent: EmitEvent,
  validate: Validate,
  getFormData: GetModelValue
) {
  const submitLoadingRef = ref(false);
  /**
   * 提交表单方法
   * 此处多次重复提交并发将会直接阻止后发提交并返回失败
   * 下次有空可以改成并发队列收集，订阅首发请求异步状态模式，首发请求成功后直接将后发提交状态标记为完成，而不是直接返回失败
   */
  const submitFunction: SubmitFunction = async function () {
    if (unref(submitLoadingRef)) {
      return Promise.reject("表单提交中");
    } else {
      await validate();
      let formData = unref(getFormData);
      const { submitApi, beforeSubmit } = unref(getProps);
      let submitResult;
      if (submitApi) {
        if (beforeSubmit) {
          formData = await beforeSubmit(formData);
        }
        submitResult = await submitApi(formData);
      }
      emitEvent("submit", formData, submitResult);
    }
  };
  return {
    submitFunction,
    submitLoadingRef,
  };
}
