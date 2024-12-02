import { z } from "zod"

export const projects = z.object({ "id": z.string().max(16).nullable().optional(), "name": z.string().max(255).nullable().optional(), "org_id": z.string().max(16).nullable().optional(), "account_id": z.string().max(24).nullable().optional(), "created_at": z.string().datetime({ offset: true }).nullable().optional(), "updated_at": z.string().datetime({ offset: true }).nullable().optional(), "archived_at": z.string().datetime({ offset: true }).nullable().optional() }).strict()
export type Projects = z.infer<typeof projects>
