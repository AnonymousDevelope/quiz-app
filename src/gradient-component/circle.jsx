import React, { useEffect, useState } from 'react';
import './circle.css';

const Circle = ({ position, left, right, top }) => {
  const [animationDelay, setAnimationDelay] = useState('1s');

  useEffect(() => {
    const randomDelay = (Math.random() * (position < 10 ? position : position - 4)) + 's';
    setAnimationDelay(randomDelay);
  }, [position]);

  return (
    <div
      className='circle'
      style={{
        top: top,
        left: left,
        right: right,
        animationDelay: animationDelay || "3s",
      }}
    ></div>
  );
};

export default Circle;
