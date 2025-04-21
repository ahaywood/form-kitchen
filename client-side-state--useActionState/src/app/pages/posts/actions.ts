"use server"

import { db } from "@/db"

export async function createPost(previousState: {
  error: string | null,
  title: string,
  content: string,
}, formData: FormData) {
  const title = formData.get("title") as string;
  const content = formData.get("content") as string;

  try {
    await db.post.create({
      data: {
        title,
        content,
      },
    })
  } catch (error) {
    return {
      error: "Failed to create post",
      title,
      content,
    }
  }

  return {
    error: null,
    title: "",
    content: "",
  }
}
