import React from 'react';
import './Button.css';

function Button(props) {
  // Dynamically defining button classes based on the 'disabled' prop
  const buttonClasses = `button ${props.disabled ? 'disabled' : ''}`;

  return (
    <button
      {...props} // Spread operator to pass all props to the button element
      className={buttonClasses} // Applying dynamic class name to the button element
    />
  );
}

export default Button;


