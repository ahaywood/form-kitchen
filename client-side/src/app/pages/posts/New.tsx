import { db } from "@/db";
import { Form } from "./Form";

const NewPost = async () => {
  const posts = await db.post.findMany();

  return (
    <>
      <Form />
      <pre>{JSON.stringify(posts, null, 2)}</pre>
    </>
  )
}

export { NewPost }