"use server";

import { db } from "@/db";

export const createPost = async (formData: FormData) => {
  const title = formData.get("title") as string;
  const content = formData.get("content") as string;

  await db.post.create({
    data: {
      title,
      content,
    },
  });

  console.log(title, content);

  return { error: null };
}