const New = () => {
  const handleSubmit = async (formData: FormData) => {
    "use server";
    const title = formData.get("title");
    const content = formData.get("content");
    console.log(title, content);
  }

  return (
    <form action={handleSubmit}>
      <label htmlFor="title">Title</label>
      <input type="text" name="title" />
      <hr />
      <label htmlFor="content">Content</label>
      <input type="text" name="content" />
      <hr />
      <button type="submit">Create</button>
    </form>
  )
}

export { New }