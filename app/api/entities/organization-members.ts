import { z } from "zod"

export const organization_members = z.object({ "org_id": z.string().max(16).nullable().optional(), "account_id": z.string().max(24).nullable().optional(), "role": z.string().max(32).nullable().optional() }).strict()
export type Organization_members = z.infer<typeof organization_members>
