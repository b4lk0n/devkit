import { purry } from "remeda"
import type { Result } from "./result.js"
import { unwrap } from "./unwrap.js"

export function unwrapOr<E, T>(def: T): (result: Result<E, T>) => T
export function unwrapOr<E, T>(result: Result<E, T>, def: T): T

export function unwrapOr(...args: ReadonlyArray<unknown>): unknown {
  return purry(unwrapOrImpl, args)
}

function unwrapOrImpl<E, T>(result: Result<E, T>, def: T) {
  try {
    return unwrap(result)
  } catch {
    return def
  }
}
