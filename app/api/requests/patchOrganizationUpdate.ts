import { z } from "zod"

export const patchOrganizationUpdate = z.object({ "name": z.string().min(3).optional(), "email": z.string().email().optional() })
export type PatchOrganizationUpdate = z.infer<typeof patchOrganizationUpdate>
