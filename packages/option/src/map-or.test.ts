import { describe, expect, it } from "vitest"
import { mapOr } from "./map-or.js"
import { none, some } from "./option.js"
import { unwrap } from "./unwrap.js"

describe("Option.mapOr", () => {
  it("maps Some<T> to Some<F>", () => {
    const res = mapOr(5, (x: number) => x * 2)(some(1))
    expect(res).toHaveProperty("data", 2)

    const res2 = mapOr(some(2), 5, (x: number) => x + 10)
    expect(res2).toHaveProperty("data", 12)
  })

  it("maps to a default value for None values", () => {
    const mapper = (x: number) => x * 2
    const res = mapOr(5, mapper)(none())
    expect(unwrap(res)).toBe(5)

    const res2 = mapOr(none(), 5, mapper)
    expect(unwrap(res2)).toBe(5)
  })
})
