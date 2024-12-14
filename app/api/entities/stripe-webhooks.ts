import { z } from "zod"

export const stripe_webhooks = z.object({ "id": z.string().max(32).nullable().optional(), "event": z.string().max(64).nullable().optional(), "data": z.record(z.any()).nullable().optional(), "received_at": z.string().datetime({ offset: true }).nullable().optional(), "processed_at": z.string().datetime({ offset: true }).nullable().optional() }).strict()
export type Stripe_webhooks = z.infer<typeof stripe_webhooks>
