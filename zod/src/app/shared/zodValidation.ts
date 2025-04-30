import { z } from "zod";

export const parseZodErrors = <T extends z.ZodType>(
  schema: T,
  data: unknown
): { success: true; data: z.infer<T> } | { success: false; errors: Record<string, string> } => {
  const result = schema.safeParse(data);

  if (!result.success) {
    const fieldErrors: Record<string, string> = {};
    result.error.errors.forEach(err => {
      fieldErrors[err.path[0]] = err.message;
    });
    return { success: false, errors: fieldErrors };
  }

  return { success: true, data: result.data };
};
