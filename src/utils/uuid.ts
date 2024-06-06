import type { UUID } from "@/global";
import { v4 as uuidv4, NIL, validate } from "uuid";
export const EmptyUUId = NIL;
 
export function buildUUID(): UUID {
  return uuidv4();
}
export function isEmptyUUId(
  v: UUID
): v is "00000000-0000-0000-0000-000000000000" {
  return EmptyUUId === v;
}
export function isUUId(id): id is UUID {
  return validate(id);
}
