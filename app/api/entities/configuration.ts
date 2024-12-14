import { z } from "zod"

export const configuration = z.object({ "setting": z.string().max(32).nullable().optional(), "value": z.string().nullable().optional(), "updated_at": z.string().datetime({ offset: true }).nullable().optional() }).strict()
export type Configuration = z.infer<typeof configuration>
