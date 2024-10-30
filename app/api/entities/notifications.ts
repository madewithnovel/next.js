import { z } from "zod"

export const notifications = z.object({ "id": z.number().int().nullable().optional(), "notification_id": z.string().max(32).nullable().optional(), "author_id": z.string().max(24).nullable().optional(), "title": z.string().max(255), "body": z.string().nullable().optional(), "icon": z.string().max(255).nullable().optional(), "level": z.string().max(32).nullable().optional(), "metadata": z.record(z.any()).nullable().optional(), "destination": z.record(z.any()).nullable().optional(), "timestamp": z.string().datetime({ offset: true }).nullable().optional(), "archived_at": z.string().datetime({ offset: true }).nullable().optional() }).strict()
export type Notifications = z.infer<typeof notifications>
