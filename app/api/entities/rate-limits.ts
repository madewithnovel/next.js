import { z } from "zod"

export const rate_limits = z.object({ "route": z.string(), "source": z.string(), "hit": z.number().int().nullable().optional(), "ttl": z.number().int().nullable().optional() }).strict()
export type Rate_limits = z.infer<typeof rate_limits>
