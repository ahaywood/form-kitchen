import * as z from "zod"
import { CompleteUser, RelatedUserModel } from "./index"

export const CredentialModel = z.object({
  id: z.string(),
  userId: z.string(),
  createdAt: z.date(),
  credentialId: z.string(),
  publicKey: z.unknown(),
  counter: z.number().int(),
})

export interface CompleteCredential extends z.infer<typeof CredentialModel> {
  user: CompleteUser
}

/**
 * RelatedCredentialModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedCredentialModel: z.ZodSchema<CompleteCredential> = z.lazy(() => CredentialModel.extend({
  user: RelatedUserModel,
}))
