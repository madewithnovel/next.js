import { z } from "zod"

export const account_key_access = z.object({ "id": z.number().int().nullable().optional(), "request_id": z.string().uuid().nullable().optional(), "access_id": z.string().max(64).nullable().optional(), "timestamp": z.string().datetime({ offset: true }).nullable().optional() }).strict()
export type Account_key_access = z.infer<typeof account_key_access>
