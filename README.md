The purpose of this mono repo is to demonstrate all the ways you can handle form submission, using [RedwoodSDK](https://rwsdk.com).

At it's core, RedwoodSDK is React + Vite plugin + Cloudflare services. Therefore, anything documented within the React 19 official documentation should be supported within RedwoodSDK.

---

## Quick Start

This mono repo contains 6 different examples for handling forms:

1. Client side, using `useActionState`
2. Client side, using `useTransition`
3. Inline button
4. Server Action
5. Inline Server Action
6. Server Action, using `useFormStatus`

Clone the entire repo:

```bash
git clone https://github.com/ahaywood/form-kitchen.git
```

Within each project, you'll need to run:

```bash
pnpm i
pnpm dev
```

---

## Project Setup

Each of these projects are set up similarly, making comparisons easy.

Each project begins with the [RedwoodSDK starter kit](https://github.com/redwoodjs/sdk/tree/main/starters/standard).

I added a Prisma model for Posts:

```prisma
model Post {
  id        String   @id @default(uuid())
  title     String
  content   String
  createdAt DateTime @default(now())
}
```

I created a `/new` route for adding a new post. This utilities the `New` component, defined `src/app/pages/posts/New.tsx`

Usually, the server action is defined within the `src/app/pages/posts/actions.ts` file.

---

## [1. Client side, using `useActionState`]('./client-side-state--useActionState')

- Uses `useActionState` to track form submission state.
- Can manage pending state (isPending).
- Can handle validation and UI updates.

```tsx
const [state, formAction, isPending] = useActionState(submitForm, {
  error: null,
});

<form action={formAction}>
  <input type="text" name="name" />
  <button type="submit" disabled={isPending}>
    Submit
  </button>
  {state.error && <p>{state.error}</p>}
</form>;
```

---

## [2. Client side, using `useTransition`](./client-side-state--useTransition/)

Use `startTransition()` to manually call a server action without blocking UI updates.

```tsx
"use client";
import { useTransition } from "react";
import { submitForm } from "./actions";

function FormComponent() {
  const [isPending, startTransition] = useTransition();

  const handleSubmit = (event) => {
    event.preventDefault();
    startTransition(() => submitForm(new FormData(event.target)));
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="name" />
      <button type="submit" disabled={isPending}>
        {isPending ? "Submitting..." : "Submit"}
      </button>
    </form>
  );
}
```

Why use `startTransition()`?

- Prevents blocking UI updates while the action is in progress.
- Allows users to interact with the page while waiting for the server response.

Typically, you'll use `useTransition()` with `useOptimistic()` to provide immediate feedback while the server action is in progress.

---

## 3. [Inline button](./inline-button)

- Useful for multiple actions in the same form.
- Each button can call a different server function.

```tsx
<form>
  <input type="text" name="name" />
  <button formAction={saveDraft}>Save Draft</button>
  <button formAction={submitForm}>Submit</button>
</form>
```

In this example, save draft might store the input temporarily, while submit might send the data to the server for processing.

---

## [4. Server Action](./server-action)

- Calls a server action directly when the form is submitted.
- Works without JavaScript (progressive enhancement).
- The server action can return state updates or a redirect.

```tsx
<form action={submitForm}>
  <input type="text" name="name" />
  <button type="submit">Submit</button>
</form>
```

---

## 5. Inline Server Action

This is similar to #4, except instead of abstracting your server action into a separate file, you can call it directly from the component:

````tsx
const New = () => {
  const handleSubmit = async (formData: FormData) => {
    "use server";
    const title = formData.get("title");
    const content = formData.get("content");
    console.log(title, content);
  }

  return (
    <form action={handleSubmit}>
      <input type="text" name="title" />
      <button type="submit">Create</button>
    </form>
  )
}

---

## 6. Server Action, using `useFormStatus`

This is similar to #4, except it utilizes the `useFormStatus` hook, which provides status information of the last form submission.

```tsx
const NewPost = () => {
  const status = useFormStatus();

  return (
    <>
      <form action={createPost}>
        <fieldset disabled={status.pending}>
          <label htmlFor="title">Title</label>
          <input type="text" name="title" />
          <hr />
          <label htmlFor="content">Content</label>
          <input type="text" name="content" />
          <hr />
          <button type="submit">Create Post</button>
        </fieldset>
      </form>
    </>
  )
}
````
