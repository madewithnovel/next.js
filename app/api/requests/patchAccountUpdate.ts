import { z } from "zod"

export const patchAccountUpdate = z.object({ "display_name": z.string().min(6).optional(), "picture": z.string().url().optional(), "url": z.string().url().optional() })
export type PatchAccountUpdate = z.infer<typeof patchAccountUpdate>
