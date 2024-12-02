import { z } from "zod"

export const deleteAccountMfaRevoke = z.object({ "sudo_password": z.string() })
export type DeleteAccountMfaRevoke = z.infer<typeof deleteAccountMfaRevoke>
