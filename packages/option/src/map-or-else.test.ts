import { describe, expect, it } from "vitest"
import { mapOrElse } from "./map-or-else.js"
import { none, some } from "./option.js"
import { unwrap } from "./unwrap.js"

describe("Option.mapOrElse", () => {
  it("maps Some<T> to Some<F>", () => {
    const def = () => 5
    const mapper = (x: number) => x * 3

    const opt = mapOrElse(def, mapper)(some(10))
    expect(unwrap(opt)).toBe(30)

    const opt2 = mapOrElse(some(5), def, mapper)
    expect(unwrap(opt2)).toBe(15)
  })

  it("maps to result of a default function for None values", () => {
    const def = () => 5
    const mapper = (x: number) => x * 2

    const opt = mapOrElse(def, mapper)(none())
    expect(unwrap(opt)).toBe(5)

    const opt2 = mapOrElse(none(), def, mapper)
    expect(unwrap(opt2)).toBe(5)
  })
})
