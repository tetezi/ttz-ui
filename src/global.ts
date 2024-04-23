import type { ComputedRef } from "vue";

/**键名为string类型的对象 */
export type Recordable<T = any> = Record<string, T>;
/**emit事件简写还原为完整对象事件onEvent */
export type ShortEventToOnEvent<T extends Recordable> = {
  [K in keyof T as `on${Capitalize<string & K>}`]?: (...args: T[K]) => void;
};
/**
 * 可选props合并默认值，去除可选标识符
 */
export type PropsWithDefaults<
  Raw extends Recordable,
  Def extends Recordable
> = {
  [K in keyof Raw as K extends keyof Def ? never : K]: Raw[K];
} & {
  [K in keyof Raw as K extends keyof Def ? K : never]-?: Raw[K];
};

export type GetProps<
  Raw extends Recordable,
  Def extends Recordable,
  Extend extends Recordable
> = ComputedRef<PropsWithDefaults<Raw, Def> & Extend>;

/** 原始类型  */
export type Primitive =
  | string
  | number
  | boolean
  | bigint
  | symbol
  | undefined
  | null;

/**压缩类型推断范围 */
export type Narrow<T> = T extends []
  ? []
  : {
      [K in keyof T]: T[K] extends Primitive ? T[K] : Narrow<T[K]>;
    };

// 数组展开一级
export type Flatten<T> = T extends (infer U)[] ? U : never;

/**UUID格式字符串 */
export type UUID = string;

export type MaybePromise<T = any> = T | Promise<T>;
export type MaybeArray<T = any> = T | Array<T>;
