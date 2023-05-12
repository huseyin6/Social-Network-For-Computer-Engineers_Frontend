// AnimatedSwitch.js

import React from 'react';
import { useLocation } from 'react-router-dom';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

const AnimatedSwitch = ({ children }) => {
  const location = useLocation();

  return (
    <TransitionGroup>
      <CSSTransition key={location.key} timeout={100} classNames="fade">
        {children}
      </CSSTransition>
    </TransitionGroup>
  );
};

export default AnimatedSwitch;