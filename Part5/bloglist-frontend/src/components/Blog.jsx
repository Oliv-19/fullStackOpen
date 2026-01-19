import { useState } from "react"
const Blog = ({ blog ,handleLikes}) => {
  const [isOpen, setIsOpen] = useState(false)
  const isVisible = () =>{
    setIsOpen(!isOpen)
  }
  let styles = {
    border: '1px solid black',
    width: 'fit-content',
    padding:'5px',
    margin: '5'
  }
  const likeBlog = async() =>{
    handleLikes(blog)
  }
  return (
    <div style={styles }>
    {isOpen? (
        <>
          <p>{blog.title} <button onClick={isVisible}>hide</button></p> 
          <p>{blog.url}</p>
          <p>likes {blog.likes} <button onClick={likeBlog}>like</button></p>
          <p>{blog.author}</p>
        </>
      ): (
        <>
          {blog.title} {blog.author} <button onClick={isVisible}>view</button>
        </>    
    )}
    </div>

  )
}

export default Blog