import { type Result, isOk } from "./result.js"

export function unwrap<E, T>(result: Result<E, T>): T {
  if (isOk(result)) {
    return result.data
  }

  throw new Error("Cannot unwrap an Err result")
}
