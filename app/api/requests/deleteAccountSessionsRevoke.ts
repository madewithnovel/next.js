import { z } from "zod"

export const deleteAccountSessionsRevoke = z.object({ "session_id": z.string().optional() })
export type DeleteAccountSessionsRevoke = z.infer<typeof deleteAccountSessionsRevoke>
