'use Client';
import React, { useRef, useEffect } from 'react';

const OutsideClickHandler = ({ outsideClickHandler, children }) => {
  const wrapperRef = useRef(null);

  useEffect(() => {
    // Function to handle click outside of the div
    const handleClickOutside = (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        outsideClickHandler();
      }
    };

    // Add event listener to handle click outside
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      // Remove event listener when component unmounts
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [outsideClickHandler]);

  return <div ref={wrapperRef}>{children}</div>;
};

export default OutsideClickHandler;
