import { z } from "zod"

export const feature_flags = z.object({ "key": z.string().max(24).nullable().optional(), "description": z.string().max(255).nullable().optional(), "enabled": z.boolean().nullable().optional(), "distribution": z.number().nullable().optional(), "condition": z.record(z.any()).nullable().optional(), "expires_at": z.string().datetime({ offset: true }).nullable().optional() }).strict()
export type Feature_flags = z.infer<typeof feature_flags>
