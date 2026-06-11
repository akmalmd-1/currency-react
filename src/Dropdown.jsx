import React, { useEffect, useRef, useState } from "react";

function Dropdown({ options, selected, onSelect }) {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  // close on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="dropdown" ref={dropdownRef}>
      <div className="dropdown-selected" onClick={() => setOpen(!open)}>
        {selected || "Select"}
        <span>▼</span>
      </div>

      {open && (
        <div className="dropdown-list">
          {options.map((opt) => (
            <div
              key={opt}
              className="dropdown-item"
              onClick={() => {
                onSelect(opt);
                setOpen(false);
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