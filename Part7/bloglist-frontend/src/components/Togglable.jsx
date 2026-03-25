import { useImperativeHandle, useState } from "react";
import { Button } from "react-bootstrap";
const Togglable = ({ ref, children }) => {
  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };
  useImperativeHandle(ref, () => {
    return { toggleVisibility };
  });
  return (
    <>
      {isVisible ? (
        <>
          {children}
          <Button onClick={toggleVisibility}>Cancel</Button>
        </>
      ) : (
        <Button onClick={toggleVisibility}>Create new blog</Button>
      )}
    </>
  );
};

export default Togglable;
