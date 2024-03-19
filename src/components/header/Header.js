import React from 'react';
import './Header.css';

function Header({ children }) {

  return (
    <div className="header">
      {children} {/* Rendering children elements passed to the Header component */}
    </div>
  );
}

export default Header;
