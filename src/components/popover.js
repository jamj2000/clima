"use client"
import React, { useState } from "react";

const Popover = ({ content, children }) => {
  const [showPopover, setMostrarPopover] = useState(false);

  const handleCursorDentro = () => {
    setMostrarPopover(true);
  };

  const handleCursorFuera = () => {
    setMostrarPopover(false);
  };

  return (
    <div
      className="relative inline-block"
      onMouseEnter={handleCursorDentro}
      onMouseLeave={handleCursorFuera}
    >
      {children}
      {showPopover && (
        <div className="absolute z-10 w-64 p-2 text-sm text-white bg-black rounded shadow-lg"
             style={{ left: "50%", transform: "translateX(-50%)", marginTop: "0.5rem" }}>
          {content}
        </div>
      )}
    </div>
  );
};

export default Popover;