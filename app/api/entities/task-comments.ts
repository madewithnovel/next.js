import { z } from "zod"

export const task_comments = z.object({ "id": z.string().max(16).nullable().optional(), "org_id": z.string().max(16).nullable().optional(), "account_id": z.string().max(24).nullable().optional(), "project_id": z.string().max(16).nullable().optional(), "task_id": z.string().max(16).nullable().optional(), "reply_to": z.string().max(16).nullable().optional(), "comment": z.string().nullable().optional(), "posted_at": z.string().datetime({ offset: true }).nullable().optional(), "archived_at": z.string().datetime({ offset: true }).nullable().optional() }).strict()
export type Task_comments = z.infer<typeof task_comments>
