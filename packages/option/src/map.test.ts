import { describe, expect, it } from "vitest"
import { map } from "./map.js"
import { isNone, none, some } from "./option.js"
import { unwrap } from "./unwrap.js"

describe("Option.map", () => {
  it("maps Some<T> to Some<F>", () => {
    const mapper = (x: number) => x * 2
    const opt = map(mapper)(some(5))
    expect(unwrap(opt)).toBe(10)

    const opt2 = map(some(5), (v) => v * 3)
    expect(unwrap(opt2)).toBe(15)
  })

  it("ignores None values", () => {
    const opt = map(() => 1)(none())
    expect(isNone(opt)).toBe(true)

    const opt2 = map(none(), () => 1)
    expect(isNone(opt2)).toBe(true)
  })
})
