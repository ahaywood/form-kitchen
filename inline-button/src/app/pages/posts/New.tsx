import { db } from "@/db";
import { createPost } from "./actions";

const New = async () => {
  const posts = await db.post.findMany();
  return (
    <>
      <form>
        <label htmlFor="title">Title</label>
        <input type="text" name="title" />
        <hr />
        <label htmlFor="content">Content</label>
        <input type="text" name="content" />
        <hr />
        <button type="submit" formAction={createPost}>Create</button>
      </form>
      <hr />
      <pre>{JSON.stringify(posts, null, 2)}</pre>
    </>
  )
}

export { New }