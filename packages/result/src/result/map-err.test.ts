import { describe, expect, it } from "vitest"
import { mapErr } from "./map-err.js"
import { err, isOk, ok } from "./result.js"
import { unwrapErr } from "./unwrap-err.js"

describe("Result.mapErr", () => {
  const mapper = (e: string) => `error: ${e}`

  it("maps Err<E> to Err<F>", () => {
    const res = err("oops")

    const res2 = mapErr(mapper)(res)
    expect(unwrapErr(res2)).toBe("error: oops")

    const res3 = mapErr(res, mapper)
    expect(unwrapErr(res3)).toBe("error: oops")
  })

  it("ignores Ok<T>", () => {
    const res = ok<string, number>(5)

    const res2 = mapErr(mapper)(res)
    expect(isOk(res2)).toBe(true)

    const res3 = mapErr(res, mapper)
    expect(isOk(res3)).toBe(true)
  })
})
