import { z } from "zod"

export const postAccountDeactivate = z.object({ "sudo_password": z.string() })
export type PostAccountDeactivate = z.infer<typeof postAccountDeactivate>
