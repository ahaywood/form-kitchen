"use client"

import { useState } from "react";
import { PostModel } from "zod/post";
import { z } from "zod";
import { createPost } from "./actions";
import { parseZodErrors } from "../shared/zodValidation";

// Form validation schema
export const CreatePostSchema = PostModel.omit({ id: true, createdAt: true })
export type PostFormData = z.infer<typeof CreatePostSchema>

const Form = () => {
  const [error, setError] = useState<Record<string, string>>({})

  const handleSubmit = async (formData: FormData) => {
    const title = formData.get("title");
    const content = formData.get("content");

    console.log(`✅ Submitted: ${title} ${content}`);

    // validate the form content with Zod
    /*
    const result = CreatePostSchema.safeParse({ title, content });


    if (!result.success) {
      console.log(`❌ Validation failed: ${result.error.message}`);
      const fieldErrors = {} as Record<string, string>
      result.error.errors.forEach(err => {
        fieldErrors[err.path[0]] = err.message
      })
      setError(fieldErrors)
      return // Stop submission if validation fails
    }
    */

    const result = parseZodErrors(CreatePostSchema, { title, content });

    // If client validation passes, send to server
    console.log(`🔄 Sending to server: ${title} ${content}`);
    const response = await createPost(formData as unknown as FormData)

    console.log(`✅ Server response: ${response}`);
  }

  return (
    <form action={handleSubmit}>
        <div>
          <label htmlFor="title">Title</label>
          <input type="text" name="title" />
          {error.title && <p style={{ color: "red" }}>{error.title}</p>}
        </div>
        <div>
          <label htmlFor="content">Content</label>
          <input type="text" name="content" />
          {error.content && <p style={{ color: "red" }}>{error.content}</p>}
        </div>
        <button type="submit">Create Post</button>
      </form>
  )
}

export {Form}