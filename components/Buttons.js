import Link from 'next/link';
import React from 'react';

export const Button = ({ href, children, className, type, onClick }) => {
  const defaultClassName = `rounded-md px-4 py-2 ${className} disabled:cursor-not-allowed disabled:brightness-90`;

  const ButtonType = href ? (
    <Link href={href}>
      <a className={defaultClassName}>{children}</a>
    </Link>
  ) : (
    <button className={defaultClassName} type={type} onClick={onClick}>
      {children}
    </button>
  );
  return ButtonType;
};

export const BlueButton = (props) => {
  return (
    <Button {...props} className="bg-blue-400 text-white hover:bg-blue-500">
      {props.children}
    </Button>
  );
};

export const RedButton = (props) => {
  return (
    <Button {...props} className="bg-rose-500 text-white hover:bg-rose-600">
      {props.children}
    </Button>
  );
};

export const GreenButton = (props) => {
  return (
    <Button {...props} className="bg-teal-500 text-white hover:bg-teal-600">
      {props.children}
    </Button>
  );
};
