import { z } from "zod"

export const postAuthSignup = z.object({ "email": z.string().email(), "password": z.string(), "intent": z.string().optional(), "interval": z.enum(["month","year"]).optional(), "plan": z.string().optional(), "invitation_code": z.string().optional() })
export type PostAuthSignup = z.infer<typeof postAuthSignup>
