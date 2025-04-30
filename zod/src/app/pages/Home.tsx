import { RequestInfo } from "@redwoodjs/sdk/worker";
import { Form } from "./Form";
import { db } from "@/db";

export async function Home({ ctx }: RequestInfo) {

  // get all the posts
  const posts = await db.post.findMany();

  return (
    <div>
      <Form />

      <pre>{JSON.stringify(posts, null, 2)}</pre>
    </div>
  );
}
