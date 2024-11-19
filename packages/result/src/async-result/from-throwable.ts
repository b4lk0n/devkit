import { purry } from "remeda"
import { err, ok } from "../result/result.js"
import type { Thunk, UnaryFn } from "../types.js"
import type { AsyncResult } from "./async-result.js"

export function fromThrowable<E, T>(
  onReject: UnaryFn<unknown, E>,
): (fn: Thunk<Promise<T>>) => AsyncResult<E, T>
export function fromThrowable<E, T>(
  fn: Thunk<Promise<T>>,
  onReject: UnaryFn<unknown, E>,
): AsyncResult<E, T>

export function fromThrowable(...args: ReadonlyArray<unknown>) {
  return purry(tryCatchImpl, args)
}

async function tryCatchImpl<E, T>(
  fn: Thunk<Promise<T>>,
  onReject: UnaryFn<unknown, E>,
) {
  try {
    const val = await fn()
    return ok(val)
  } catch (e) {
    return err(onReject(e))
  }
}
