import { z } from "zod"

export const account_events = z.object({ "id": z.number().int().nullable().optional(), "event_id": z.string().max(64).nullable().optional(), "request_id": z.string().uuid().nullable().optional(), "account_id": z.string().max(24).nullable().optional(), "timestamp": z.string().datetime({ offset: true }).nullable().optional(), "action": z.string().max(24).nullable().optional(), "message": z.string().max(255).nullable().optional(), "context": z.record(z.any()).nullable().optional() }).strict()
export type Account_events = z.infer<typeof account_events>
