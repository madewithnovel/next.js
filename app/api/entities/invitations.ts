import { z } from "zod"

export const invitations = z.object({ "id": z.number().int().nullable().optional(), "org_id": z.string().max(16).nullable().optional(), "account_id": z.string().max(24).nullable().optional(), "email": z.string().max(256).nullable().optional(), "invitation_code": z.string().max(24).nullable().optional(), "role": z.string().max(32).nullable().optional(), "created_at": z.string().datetime({ offset: true }).nullable().optional(), "accepted_at": z.string().datetime({ offset: true }).nullable().optional(), "expires_at": z.string().datetime({ offset: true }).nullable().optional() }).strict()
export type Invitations = z.infer<typeof invitations>
