import { purry } from "remeda"
import type { Option } from "./option.js"
import { unwrap } from "./unwrap.js"

export function unwrapOr<T>(def: T): (opt: Option<T>) => T
export function unwrapOr<T>(opt: Option<T>, def: T): T

export function unwrapOr(...args: ReadonlyArray<unknown>): unknown {
  return purry(unwrapOrImpl, args)
}

function unwrapOrImpl<T>(opt: Option<T>, def: T) {
  try {
    return unwrap(opt)
  } catch {
    return def
  }
}
