import { isNonNull } from "remeda"
import type { Option } from "./option.js"
import { none, some } from "./option.js"

export function fromNullable<T>(val: T | null): Option<T> {
  return isNonNull(val) ? some(val as Exclude<T, null>) : none()
}
