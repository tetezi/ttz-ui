/**键名为string类型的对象 */
export type Recordable<T = any> = Record<string, T>;
/**emit事件简写还原为完整对象事件onEvent */
export type ShortEventToOnEvent<T extends Recordable> = {
  [K in keyof T as `on${Capitalize<string & K>}`]?: (...args: T[K]) => void;
};
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
