import { useState } from 'react'
const Blog = ({ blog, isUserBlog, handleLikes, handleDeleteBlog }) => {
  const [isOpen, setIsOpen] = useState(false)
  const isVisible = () => {
    setIsOpen(!isOpen)
  }
  const likeBlog = async() => {
    handleLikes(blog)
  }
  const deleteBlog = async() => {
    handleDeleteBlog(blog)
  }
  let styles = {
    border: '1px solid black',
    width: 'fit-content',
    padding:'5px',
    margin: '5'
  }
  return (
    <div className='blog' style={styles }>
      {isOpen? (
        <>
          <p>{blog.title} <button onClick={isVisible}>hide</button></p>
          <p>{blog.url}</p>
          <p>likes {blog.likes} <button data-testid='likeBtn' onClick={likeBlog}>like</button></p>
          <p>{blog.author}</p>
          {isUserBlog === true && <button onClick={deleteBlog}>Remove</button>
          }
        </>
      ): (
        <>
          {blog.title} {blog.author} <button data-testid='viewBtn' onClick={isVisible}>view</button>
        </>
      )}
    </div>

  )
}

export default Blog