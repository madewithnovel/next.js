import { z } from "zod"

export const account_verifications = z.object({ "id": z.number().int().nullable().optional(), "account_id": z.string().max(24).nullable().optional(), "email": z.string().max(255).nullable().optional(), "type": z.enum(["verification","magiclink","reset"]).nullable().optional(), "verification_token": z.string().max(18).nullable().optional(), "created_at": z.string().datetime({ offset: true }).nullable().optional(), "accepted_at": z.string().datetime({ offset: true }).nullable().optional(), "expires_at": z.string().datetime({ offset: true }).nullable().optional() }).strict()
export type Account_verifications = z.infer<typeof account_verifications>
