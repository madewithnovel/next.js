import { z } from "zod"

export const cache = z.object({ "id": z.number().int().nullable().optional(), "key": z.string().max(64).nullable().optional(), "value": z.record(z.any()).nullable().optional(), "created_at": z.string().datetime({ offset: true }).nullable().optional(), "expires_at": z.string().datetime({ offset: true }).nullable().optional() }).strict()
export type Cache = z.infer<typeof cache>
