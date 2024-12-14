import { z } from "zod"

export const account_notification_tokens = z.object({ "id": z.number().int().nullable().optional(), "account_id": z.string().max(24).nullable().optional(), "source": z.string().max(24).nullable().optional(), "endpoint": z.string().nullable().optional(), "auth": z.string().nullable().optional(), "key": z.string().nullable().optional(), "created_at": z.string().datetime({ offset: true }).nullable().optional(), "muted_at": z.string().datetime({ offset: true }).nullable().optional() }).strict()
export type Account_notification_tokens = z.infer<typeof account_notification_tokens>
