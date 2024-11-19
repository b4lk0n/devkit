import { describe, expect, it } from "vitest"
import { match } from "./match.js"
import { none, some } from "./option.js"

describe("Option.match", () => {
  const onNone = () => 1
  const onSome = (x: number) => x * 2

  it("matches None values", () => {
    const opt = match(onNone, onSome)(none())
    expect(opt).toBe(1)

    const opt2 = match(none(), onNone, onSome)
    expect(opt2).toBe(1)
  })

  it("matches Some values", () => {
    const opt = match(onNone, onSome)(some(2))
    expect(opt).toBe(4)

    const opt2 = match(some(2), onNone, onSome)
    expect(opt2).toBe(4)
  })
})
