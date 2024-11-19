import { purry } from "remeda"
import type { Option } from "./option.js"
import type { Thunk } from "./types.js"
import { unwrap } from "./unwrap.js"

export function unwrapOrElse<T>(def: Thunk<T>): (opt: Option<T>) => T
export function unwrapOrElse<T>(opt: Option<T>, def: Thunk<T>): T

export function unwrapOrElse(...args: ReadonlyArray<unknown>): unknown {
  return purry(unwrapOrElseImpl, args)
}

function unwrapOrElseImpl<T>(opt: Option<T>, def: Thunk<T>) {
  try {
    return unwrap(opt)
  } catch {
    return def()
  }
}
