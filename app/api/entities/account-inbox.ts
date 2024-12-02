import { z } from "zod"

export const account_inbox = z.object({ "id": z.number().int().nullable().optional(), "notification_id": z.string().max(32).nullable().optional(), "org_id": z.string().max(16).nullable().optional(), "account_id": z.string().max(24).nullable().optional(), "received_at": z.string().datetime({ offset: true }).nullable().optional(), "read_at": z.string().datetime({ offset: true }).nullable().optional(), "archived_at": z.string().datetime({ offset: true }).nullable().optional() }).strict()
export type Account_inbox = z.infer<typeof account_inbox>
