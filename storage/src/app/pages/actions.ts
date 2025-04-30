"use server";
import { db } from "@/db";
import { env } from "cloudflare:workers";

export const createPost = async (formData: FormData) => {
  const title = formData.get("title") as string;
  const content = formData.get("content") as string;
  const file = formData.get("cover") as File;

  console.log(`🔼 Uploading file to R2`);
  console.log({ file });

  // Stream the file directly to R2
  const r2ObjectKey = `/storage/${file.name}`;
  await env.R2.put(r2ObjectKey, file.stream(), {
    httpMetadata: {
      contentType: file.type,
    },
  });

  await db.post.create({
    data: {
      title,
      content,
      cover: r2ObjectKey,
    },
  });

  return { success: true, error: null };
}