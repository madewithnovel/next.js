import { z } from "zod"

export const access_control = z.object({ "actor": z.string().max(64), "type": z.enum(["can","cannot"]).nullable().optional(), "action": z.string().max(64), "subject": z.record(z.any()), "fields": z.record(z.any()).nullable().optional() }).strict()
export type Access_control = z.infer<typeof access_control>
