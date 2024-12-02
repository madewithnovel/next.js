import { z } from "zod"

export const organizations = z.object({ "id": z.string().max(16).nullable().optional(), "name": z.string().max(64).nullable().optional(), "type": z.enum(["personal","organization"]).nullable().optional(), "quotas": z.record(z.any()).nullable().optional(), "settings": z.record(z.any()).nullable().optional(), "customer_id": z.string().max(64).nullable().optional(), "email": z.string().max(255).nullable().optional(), "created_at": z.string().datetime({ offset: true }).nullable().optional(), "updated_at": z.string().datetime({ offset: true }).nullable().optional(), "archived_at": z.string().datetime({ offset: true }).nullable().optional() }).strict()
export type Organizations = z.infer<typeof organizations>
