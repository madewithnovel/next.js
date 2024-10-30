import { z } from "zod"

export const patchProjectUpdate = z.object({ "name": z.string().optional() })
export type PatchProjectUpdate = z.infer<typeof patchProjectUpdate>
