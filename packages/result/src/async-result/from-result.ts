import type { Result } from "../result/result.js"
import type { AsyncResult } from "./async-result.js"

export function fromResult<E, T>(result: Result<E, T>): AsyncResult<E, T> {
  return Promise.resolve(result)
}
