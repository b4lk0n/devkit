import { describe, expect, it } from "vitest"
import { fromThrowable } from "./from-throwable.js"
import { unwrapErr } from "./unwrap-err.js"
import { unwrap } from "./unwrap.js"

describe("Result.fromThrowable", () => {
  const onThrow = (e: unknown) => `error: ${e}`

  it("returns Ok<T> if a function does not throw", () => {
    const f = () => 5

    const res = fromThrowable(onThrow)(f)
    expect(unwrap(res)).toBe(5)

    const res2 = fromThrowable(f, onThrow)
    expect(unwrap(res2)).toBe(5)
  })

  it("returns Err<E> if a function throws", () => {
    const f = () => {
      throw "oops"
    }

    const res = fromThrowable(onThrow)(f)
    expect(unwrapErr(res)).toBe("error: oops")

    const res2 = fromThrowable(f, onThrow)
    expect(unwrapErr(res2)).toBe("error: oops")
  })
})
