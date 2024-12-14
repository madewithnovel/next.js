import { z } from "zod"

export const account_keys = z.object({ "id": z.number().int().nullable().optional(), "access_id": z.string().max(64).nullable().optional(), "account_id": z.string().max(24).nullable().optional(), "org_id": z.string().max(24).nullable().optional(), "label": z.string().max(32).nullable().optional(), "expiry": z.string().max(12).nullable().optional(), "secret_key": z.string().nullable().optional(), "scope": z.record(z.any()).nullable().optional(), "created_at": z.string().datetime({ offset: true }).nullable().optional(), "expires_at": z.string().datetime({ offset: true }).nullable().optional(), "revoked_at": z.string().datetime({ offset: true }).nullable().optional() }).strict()
export type Account_keys = z.infer<typeof account_keys>
