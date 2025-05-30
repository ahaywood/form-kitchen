"use client";

import { useState } from "react";
import { createPost } from "./actions";
import { DragAndDrop } from "./DragAndDrop";

const Form = () => {
  const [result, setResult] = useState<string | null>(null);

  const handleImage = async (formData: FormData) => {
    const result = await createPost(formData);
    if (result.error) {
      setResult(result.error);
    } else {
      setResult("Post created successfully");
    }
  };

  return (
    <form action={handleImage}>
      {result && (
        <p style={{ color: "purple", fontWeight: "bold" }}>{result}</p>
      )}
      <div>
        <label htmlFor="title">Title</label>
        <input type="text" name="title" />
      </div>
      <div>
        <label htmlFor="content">Content</label>
        <textarea name="content" />
      </div>
      <div>
        <label htmlFor="cover">Cover</label>
        {/* <input type="file" name="cover" /> */}
        <DragAndDrop name="cover" />
      </div>
      <button type="submit">Create</button>
    </form>
  );
};

export { Form };
