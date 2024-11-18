import { describe, expect, it } from "vitest"
import { map } from "./map.js"
import { err, isErr, ok } from "./result.js"
import { unwrap } from "./unwrap.js"

describe("Result.map", () => {
  it("maps Ok<T> to Ok<U>", () => {
    const mapper = (x: number) => x * 2
    const res = map(mapper)(ok(5))
    expect(unwrap(res)).toBe(10)

    const res2 = map(ok(5), mapper)
    expect(unwrap(res2)).toBe(10)
  })

  it("ignores Err<E>", () => {
    const res = map(() => 1)(err("oops"))
    expect(isErr(res)).toBe(true)

    const res2 = map(err("oops"), () => 1)
    expect(isErr(res2)).toBe(true)
  })
})
