import { z } from "zod"

export const postAccountUpdatePassword = z.object({ "password": z.string().min(6).max(64), "new_password": z.string().min(6).max(64) })
export type PostAccountUpdatePassword = z.infer<typeof postAccountUpdatePassword>
