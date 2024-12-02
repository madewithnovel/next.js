import { z } from "zod"

export const patchAccountSettingsUpdate = z.object({ "theme": z.string().optional(), "timezone": z.string().optional(), "language": z.string().optional(), "marketing": z.boolean().optional(), "newsletter": z.boolean().optional() })
export type PatchAccountSettingsUpdate = z.infer<typeof patchAccountSettingsUpdate>
