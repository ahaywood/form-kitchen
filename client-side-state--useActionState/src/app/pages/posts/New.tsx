"use client"

import { db } from "@/db";
import { createPost } from "./actions";
import { useActionState } from "react";

const New = () => {
  const [{
    error,
    title,
    content,
  }, formAction, isPending] = useActionState(createPost, { error: null, title: "", content: "" })

  return (
    <>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form action={formAction}>
        <fieldset disabled={isPending}>
          <label htmlFor="title">Title</label>
          <input type="text" name="title" defaultValue={title} />
          <hr />
          <label htmlFor="content">Content</label>
          <input type="text" name="content" defaultValue={content} />
          <hr />
          <button type="submit">Create</button>
        </fieldset>
      </form>
    </>
  )
}

export { New }