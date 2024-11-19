import { isDefined } from "remeda"
import type { Option } from "./option.js"
import { none, some } from "./option.js"

export function fromUndefined<T>(val: T | undefined): Option<T> {
  return isDefined(val) ? some(val as Exclude<T, undefined>) : none()
}
