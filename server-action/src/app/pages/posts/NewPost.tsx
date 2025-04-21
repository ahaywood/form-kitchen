import { db } from "@/db";
import { createPost } from "./actions";

const NewPost = async () => {
  const posts = await db.post.findMany();

  return (
    <>
      <form action={createPost}>
        <label htmlFor="title">Title</label>
        <input type="text" name="title" />
        <hr />
        <label htmlFor="content">Content</label>
        <input type="text" name="content" />
        <hr />
        <button type="submit">Create Post</button>
      </form>

      <pre>{JSON.stringify(posts, null, 2)}</pre>
    </>
  )
}

export { NewPost }