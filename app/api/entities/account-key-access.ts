import { z } from "zod"

export const account_key_access = z.object({ "id": z.number().int().nullable().optional(), "request_id": z.string().uuid().nullable().optional(), "access_id": z.string().max(64).nullable().optional(), "method": z.enum(["POST","GET","HEAD","DELETE","PATCH","PUT"]).nullable().optional(), "url": z.string().nullable().optional(), "origin": z.string().nullable().optional(), "status": z.number().nullable().optional(), "ip": z.string().ip({ version: "v4" }).nullable().optional(), "timestamp": z.string().datetime({ offset: true }).nullable().optional() }).strict()
export type Account_key_access = z.infer<typeof account_key_access>
