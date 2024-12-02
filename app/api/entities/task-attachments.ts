import { z } from "zod"

export const task_attachments = z.object({ "id": z.string().max(16).nullable().optional(), "org_id": z.string().max(16).nullable().optional(), "account_id": z.string().max(24).nullable().optional(), "project_id": z.string().max(16).nullable().optional(), "task_id": z.string().max(16).nullable().optional(), "owner_id": z.string().max(16).nullable().optional(), "name": z.string().max(255).nullable().optional(), "private_url": z.string().nullable().optional(), "public_url": z.string().nullable().optional(), "uploaded_at": z.string().datetime({ offset: true }).nullable().optional(), "archived_at": z.string().datetime({ offset: true }).nullable().optional() }).strict()
export type Task_attachments = z.infer<typeof task_attachments>
