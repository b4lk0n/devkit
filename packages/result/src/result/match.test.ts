import { describe, expect, it } from "vitest"
import { match } from "./match.js"
import { err, ok } from "./result.js"

describe("Result.match", () => {
  const onErr = (e: string) => `error: ${e}`
  const onOk = (x: number) => `ok: ${x}`

  it("maps Ok<T>", () => {
    const res = ok<string, number>(5)

    const val = match(onErr, onOk)(res)
    expect(val).toBe("ok: 5")

    const val2 = match(res, onErr, onOk)
    expect(val2).toBe("ok: 5")
  })

  it("maps Err<E>", () => {
    const res = err<string, number>("oops")

    const val = match(onErr, onOk)(res)
    expect(val).toBe("error: oops")

    const val2 = match(res, onErr, onOk)
    expect(val2).toBe("error: oops")
  })
})
