import { describe, expect, it } from "vitest"
import { ok } from "../result/result.js"
import { unwrap } from "../result/unwrap.js"
import { fromResult } from "./from-result.js"

describe("AsyncResult.fromResult", () => {
  it("creates AsyncResult<E, T> from Result<E, T>", async () => {
    const async = fromResult(ok(2))

    expect(async).toBeInstanceOf(Promise)

    const res = await async
    expect(unwrap(res)).toBe(2)
  })
})
