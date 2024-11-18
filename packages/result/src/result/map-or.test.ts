import { describe, expect, it } from "vitest"
import { mapOr } from "./map-or.js"
import { err, ok } from "./result.js"
import { unwrap } from "./unwrap.js"

describe("Result.mapOr", () => {
  const mapper = (x: number) => x * 2

  it("maps Ok<T> to Ok<U>", () => {
    const res = ok(5)

    const res2 = mapOr(3, mapper)(res)
    expect(unwrap(res2)).toBe(10)

    const res3 = mapOr(res, 3, mapper)
    expect(unwrap(res3)).toBe(10)
  })

  it("maps Err<T> to a default value", () => {
    const res = err<string, number>("oops")

    const res2 = mapOr(3, mapper)(res)
    expect(unwrap(res2)).toBe(3)

    const res3 = mapOr(res, 3, mapper)
    expect(unwrap(res3)).toBe(3)
  })
})
