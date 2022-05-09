import React from 'react';

function Dropdown({ name, id, label, value, children, onChange }) {
  return (
    <div className="mb-4">
      {label && (
        <label
          htmlFor={name}
          className="block text-gray-700 text-sm font-bold mb-2"
        >
          {label}
        </label>
      )}
      <select
        name={name}
        id={id}
        value={value}
        onChange={onChange}
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      >
        {children}
      </select>
    </div>
  );
}

export default Dropdown;
