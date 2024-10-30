import { z } from "zod"

export const postProjectNew = z.object({ "name": z.string().optional() })
export type PostProjectNew = z.infer<typeof postProjectNew>
