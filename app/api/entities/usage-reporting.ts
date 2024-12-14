import { z } from "zod"

export const usage_reporting = z.object({ "required": z.any().optional(), "subscription_id": z.string().max(64).nullable().optional(), "metric": z.string().nullable().optional(), "value": z.number().int().nullable().optional(), "timestamp": z.string().datetime({ offset: true }).nullable().optional(), "reported_at": z.string().datetime({ offset: true }).nullable().optional() }).strict()
export type Usage_reporting = z.infer<typeof usage_reporting>
