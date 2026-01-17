const NewBlogForm = ({setNewBlog, createNewBlog}) => {

  const handleChange = (e) => {
    const name = e.target.id
    setNewBlog((prev) =>({...prev, [name] : e.target.value}))
  }
  return (
    <div>
        <h1>Create new blog</h1>
        <form action="" onSubmit={createNewBlog}>
          <label>
            title:
            <input onChange={handleChange} type="text" name="title" id="title" />
          </label>
          <br />
          <label>
            author:
            <input onChange={handleChange} type="text" name="author" id="author" />
          </label>
          <br />

          <label>
            url:
            <input onChange={handleChange} type="text" name="url" id="url" />
          </label>
          <br />
          <button type="submit">create</button>
        </form>
      </div>
  )
}

export default NewBlogForm