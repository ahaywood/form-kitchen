"use server";

import { db } from "@/db";

export async function createPost(formData: FormData) {
  const title = formData.get("title") as string;
  const content = formData.get("content") as string;

  await db.post.create({
    data: {
      title,
      content
    },
  });
}
