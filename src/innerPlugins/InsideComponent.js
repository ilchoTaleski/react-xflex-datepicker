import React, { useRef, useEffect } from 'react';

const InsideComponent = ({
  children,
  onOutsideClick = () => {},
  onOutsideMouseOver = () => {}
}) => {
  let node = useRef();
  useEffect(() => {
    const handleClick = e => {
      if (node.current.contains(e.target)) {
        // inside click
        return;
      }
      onOutsideClick(e);
    };
    const handleMouseOver = e => {
      if (node.current.contains(e.target)) {
        // inside click
        return;
      }
      onOutsideMouseOver(e);
    };
    document.addEventListener('mousedown', handleClick);
    document.addEventListener('mouseover', handleMouseOver);

    return () => {
      document.removeEventListener('mousedown', handleClick);
      document.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  return <div ref={node}>{children}</div>;
};

export default InsideComponent;
