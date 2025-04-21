"use client";

import { startTransition } from "react";
import { createPost } from "./actions";

const New = () => {

  const submitAction = async (formData: FormData) => {
    startTransition(async () => {
      const { error } = await createPost(formData);
      if (error) {
        console.error(error);
      } else {
        console.log("Post created");
      }
      console.log("Getting here");
    })
  }


  return (
    <>
      <form action={submitAction}>
        <label htmlFor="title">Title</label>
        <input type="text" name="title" />
        <hr />
        <label htmlFor="content">Content</label>
        <input type="text" name="content" />
        <hr />
        <button type="submit">Create</button>
      </form>
    </>
  )
}

export { New }