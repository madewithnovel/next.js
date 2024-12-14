import { z } from "zod"

export const files = z.object({ "id": z.number().int().nullable().optional(), "original_filename": z.string().nullable().optional(), "bucket": z.string().nullable().optional(), "filename": z.string().nullable().optional(), "hash": z.string().nullable().optional(), "type": z.string().max(64).nullable().optional(), "extension": z.string().max(12).nullable().optional(), "canonical_path": z.string().nullable().optional(), "public_url": z.string().nullable().optional(), "size": z.number().int().nullable().optional(), "uploaded_at": z.string().datetime({ offset: true }).nullable().optional() }).strict()
export type Files = z.infer<typeof files>
