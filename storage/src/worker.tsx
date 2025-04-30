import { defineApp, ErrorResponse } from "@redwoodjs/sdk/worker";
import { route, render, prefix, index } from "@redwoodjs/sdk/router";
import { Document } from "@/app/Document";
import { Home } from "@/app/pages/Home";
import { setCommonHeaders } from "@/app/headers";
import { userRoutes } from "@/app/pages/user/routes";
import { sessions, setupSessionStore } from "./session/store";
import { Session } from "./session/durableObject";
import { db, setupDb } from "./db";
import type { User } from "@prisma/client";
import { env } from "cloudflare:workers";
export { SessionDurableObject } from "./session/durableObject";

export type AppContext = {
  session: Session | null;
  user: User | null;
};

export default defineApp([
  setCommonHeaders(),
  async ({ ctx, request, headers }) => {
    await setupDb(env);
    setupSessionStore(env);

    try {
      ctx.session = await sessions.load(request);
    } catch (error) {
      if (error instanceof ErrorResponse && error.code === 401) {
        await sessions.remove(request, headers);
        headers.set("Location", "/user/login");

        return new Response(null, {
          status: 302,
          headers,
        });
      }

      throw error;
    }

    if (ctx.session?.userId) {
      ctx.user = await db.user.findUnique({
        where: {
          id: ctx.session.userId,
        },
      });
    }
  },
  render(Document, [
    index(Home),
    prefix("/user", userRoutes),
    route("/storage/*", [
      async ({ params }) => {
        // 1. Attempts to fetch object from R2 bucket using the path parameter
        const object = await env.R2.get("/storage/" + params.$0);
        // 2. If object doesn't exist, return 404
        if (object === null) {
          return new Response("Object Not Found", { status: 404 });
        }
        // 3. If found, return the object with proper content type
        return new Response(object.body, {
          headers: {
            "Content-Type": object.httpMetadata?.contentType as string,
          },
        });
      },
    ]),
  ]),
]);
