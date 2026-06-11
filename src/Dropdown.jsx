import React, { useState, useRef, useEffect } from "react";

function Dropdown({ options = [], selected, onSelect }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  // close on outside click (SAFE VERSION)
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSelect = (opt) => {
    onSelect(opt);
    setOpen(false);
  };

  return (
    <div className="dropdown" ref={ref}>
      {/* selected box */}
      <div
        className="dropdown-selected"
        onClick={(e) => {
          e.stopPropagation(); // 🔥 IMPORTANT FIX
          setOpen((prev) => !prev);
        }}
      >
        {selected || "Select"}
        <span>▼</span>
      </div>

      {/* dropdown list */}
      {open && options.length > 0 && (
        <div className="dropdown-list">
          {options.map((opt) => (
            <div
              key={opt}
              className="dropdown-item"
              onClick={(e) => {
                e.stopPropagation(); // 🔥 IMPORTANT FIX
                handleSelect(opt);
              }}
            >
              {opt}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Dropdown;