import { z } from "zod"

export const postOrganizationCreate = z.object({ "name": z.string().min(6), "email": z.string().email() })
export type PostOrganizationCreate = z.infer<typeof postOrganizationCreate>
