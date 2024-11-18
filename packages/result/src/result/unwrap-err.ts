import type { Result } from "./result.js"
import { isErr } from "./result.js"

export function unwrapErr<E, T>(result: Result<E, T>): E {
  if (isErr(result)) {
    return result.err
  }

  throw new Error("Cannot unwrap an error from Ok result")
}
