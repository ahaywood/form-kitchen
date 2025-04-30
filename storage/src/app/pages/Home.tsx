import { RequestInfo } from "@redwoodjs/sdk/worker";
import { Form } from "./Form";
import { db } from "@/db";

export async function Home({ ctx }: RequestInfo) {
  const posts = await db.post.findMany();

  return (
    <>
      <Form />
      <pre>{JSON.stringify(posts, null, 2)}</pre>

      <div>
        {posts.map((post) => (
          <div key={post.id}>
            <h2>{post.title}</h2>
            <img src={post.cover} alt={post.title} />
          </div>
        ))}
      </div>
    </>

  );
}
