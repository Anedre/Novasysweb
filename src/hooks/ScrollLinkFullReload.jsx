import React from 'react';

function ScrollLinkFullReload({ to, children, ...props }) {
  const handleClick = (e) => {
    e.preventDefault();
    window.location.href = to; // Forza la recarga completa de la página
  };

  return (
    <a href={to} onClick={handleClick} {...props}>
      {children}
    </a>
  );
}

export default ScrollLinkFullReload;