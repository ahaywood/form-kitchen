"use client";

import { createPost } from "./actions";

const Form = () => {
  const handleSubmit = async (formData: FormData) => {
    await createPost(formData);
  }

  return (
    <form action={handleSubmit}>
      <label htmlFor="title">Title</label>
      <input type="text" name="title" />
      <hr />
      <label htmlFor="content">Content</label>
      <input type="text" name="content" />
      <hr />
      <button type="submit">Create Post</button>
    </form>
  )
}

export { Form }