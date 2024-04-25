import type { GetDialogProps, DialogBind } from "./props";

export type DialogMethods<Data> = {
  open(data?: any, checkBeforeOpen?: boolean): Promise<void>;
  close(checkBeforeClose?: boolean): Promise<void>;
  submit: () => Promise<void>;
  setProps: (props: Partial<DialogBind<Data>>) => void;
  getProps: GetDialogProps<Data>;
};
