"use client";

import { createPost } from "./actions";
import { useFormStatus } from "react-dom";

const Button = () => {
  // const status = useFormStatus();
  // return <button disabled={status.pending}>{status.pending ? "Loading..." : "Create Post"}</button>
  return <button>Create Post</button>
}

const NewPost = () => {
  return (
    <>
      <form action={createPost}>
        <label htmlFor="title">Title</label>
        <input type="text" name="title" />
        <hr />
        <label htmlFor="content">Content</label>
        <input type="text" name="content" />
        <hr />
        <Button />
      </form>
    </>
  )
}

export { NewPost }