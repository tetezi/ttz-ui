import type { TableProps } from "@/components/BasicTable";
import type { Recordable, ShortEventToOnEvent } from "@/global"; 

export type TableTransferProps<Data extends Recordable> = {
  title?: string;
  columns: TableProps<Data>["columns"];
  api: TableProps<Data>["api"];
  rowKey: TableProps<Data>["rowKey"];
};

export type TableTransferShortEvent<Data extends Recordable> = {};

export type TableTransferEventObject<Data extends Recordable> =
  ShortEventToOnEvent<TableTransferShortEvent<Data>>;

export type TableTransferBind<Data extends Recordable> =
  TableTransferProps<Data> & TableTransferEventObject<Data>;
