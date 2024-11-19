import { isNullish } from "remeda"
import { none, some } from "./option.js"
import type { Option } from "./option.js"

export function fromNullish<T>(val: T | null | undefined): Option<T> {
  return isNullish(val) ? none() : some(val as Exclude<T, null | undefined>)
}
