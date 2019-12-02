import React from 'react';
import './Card.scss';

const Card = props => {
  return (
    <div className="cards-container" style={{ height: `${props.height}rem` }}>
      <div className="cards">{props.children}</div>
    </div>
  );
};

export default Card;
