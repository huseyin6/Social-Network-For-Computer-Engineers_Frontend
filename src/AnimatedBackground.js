import React from 'react';
import { animated, useSpring } from 'react-spring';
import './LabyrinthAnimation.css';

const AnimatedBackground = () => {
  const props = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 },
    config: { duration: 1000 }
  });

  return (
    <animated.div style={{
      ...props,
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      zIndex: -1,
      backgroundColor: 'd3d3d3',
    }}>
      <div className="labyrinth-line"></div>
    </animated.div>
  );
};

export default AnimatedBackground;
