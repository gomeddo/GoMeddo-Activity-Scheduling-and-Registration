import React from 'react';
import './Button.css';

function Button(props) {

  const buttonClasses = `button ${props.disabled ? 'disabled' : ''}`;

  return (
    <button
      {...props}
      className={buttonClasses}
    />
  );
}

export default Button;
