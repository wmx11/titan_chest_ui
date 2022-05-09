import React from 'react';

function Input({ type, name, label, value, placeholder, onChange, checked }) {
  const inputStyles = `shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`;
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
      {type === 'textarea' ? (
        <textarea
          className={`${inputStyles}`}
          cols="30"
          rows="10"
          onChange={onChange}
          value={value}
          name={name}
        />
      ) : (
        <input
          className={type !== 'checkbox' && `${inputStyles}`}
          type={type}
          name={name}
          value={value}
          placeholder={placeholder}
          onChange={onChange}
          checked={checked}
        />
      )}
    </div>
  );
}

export default Input;
