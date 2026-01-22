import { useImperativeHandle, useState } from 'react'
const Togglable = ({ ref, children }) => {
  const [isVisible, setIsVisible] = useState(false)
  const toggleVisibility = () => {
    setIsVisible(!isVisible)
  }
  useImperativeHandle(ref, () => {
    return { toggleVisibility }
  })
  return (
    <>
      {isVisible ? (
        <>
          {children}
          <button onClick={ toggleVisibility }>Cancel</button>
        </>
      ) : (
        <button onClick={ toggleVisibility }>Create new blog</button>
      )
      }
    </>
  )
}

export default Togglable