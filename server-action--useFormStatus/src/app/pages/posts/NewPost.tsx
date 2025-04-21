"use client";

import { createPost } from "./actions";
import { useFormStatus } from "react-dom";

const NewPost = () => {
  const status = useFormStatus();

  return (
    <>
      <form action={createPost}>
        {/* <fieldset disabled={status.pending}> */}
          <label htmlFor="title">Title</label>
          <input type="text" name="title" />
          <hr />
          <label htmlFor="content">Content</label>
          <input type="text" name="content" />
          <hr />
          <button type="submit">Create Post</button>
        {/* </fieldset> */}
      </form>
    </>
  )
}

export { NewPost }