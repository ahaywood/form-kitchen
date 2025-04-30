import * as z from "zod"
import { CompleteCredential, RelatedCredentialModel } from "./index"

export const UserModel = z.object({
  id: z.string(),
  username: z.string(),
  createdAt: z.date(),
})

export interface CompleteUser extends z.infer<typeof UserModel> {
  credentials: CompleteCredential[]
}

/**
 * RelatedUserModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedUserModel: z.ZodSchema<CompleteUser> = z.lazy(() => UserModel.extend({
  credentials: RelatedCredentialModel.array(),
}))
