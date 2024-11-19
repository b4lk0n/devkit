import type { Result } from "../result/result.js"

export type AsyncResult<E, T> = Promise<Result<E, T>>
