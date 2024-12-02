import { z } from "zod"

export const putAccountMfaRegister = z.object({ "token": z.string(), "secret": z.string() })
export type PutAccountMfaRegister = z.infer<typeof putAccountMfaRegister>
