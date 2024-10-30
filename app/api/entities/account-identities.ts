import { z } from "zod"

export const account_identities = z.object({ "id": z.number().int().nullable().optional(), "account_id": z.string().max(24).nullable().optional(), "source": z.string().max(24).nullable().optional(), "external_id": z.string().max(64).nullable().optional(), "snapshot": z.record(z.any()).nullable().optional(), "created_at": z.string().datetime({ offset: true }).nullable().optional() }).strict()
export type Account_identities = z.infer<typeof account_identities>
