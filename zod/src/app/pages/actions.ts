"use server"

import { db } from "@/db";
import { CreatePostSchema, PostFormData } from "./Form";

export async function createPost(formData: FormData) {
  const title = formData.get("title");
  const content = formData.get("content");

  console.log(`🔄 Creating post: ${title} ${content}`);

  // validate the form content with Zod
  const result = CreatePostSchema.safeParse({ title, content });

  if (!result.success) {
    console.log(`❌ Validation failed: ${result.error.message}`);
    const fieldErrors = {} as Record<string, string>
    result.error.errors.forEach(err => {
      fieldErrors[err.path[0]] = err.message
    })
    return { success: false, errors: fieldErrors }
  }

  console.log(`✅ Validation passed: ${title} ${content}`);

  // validated, add to the database
  try {
    console.log(`✅ Creating post: ${title} ${content}`);
    await db.post.create({
      data: {
        title: result.data.title,
        content: result.data.content,
      },
    })
  } catch (error) {
    console.log(`❌ Failed to create post: ${error}`);
    return { success: false, errors: { title: "Failed to create post" } }
  }

  console.log(`✅ Created post: ${title} ${content}`);
  return { success: true };
}
