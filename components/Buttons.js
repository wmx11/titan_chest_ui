import Link from 'next/link';
import React from 'react';

export const Button = ({
  href,
  children,
  className,
  type,
  onClick,
  disabled,
}) => {
  const defaultClassName = `rounded-md px-4 py-3 ${className} disabled:cursor-not-allowed disabled:brightness-90`;

  const ButtonType = href ? (
    <Link href={href}>
      <a className={defaultClassName}>{children}</a>
    </Link>
  ) : (
    <button
      className={defaultClassName}
      type={type}
      onClick={onClick}
      disabled={disabled}
    >
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

export const TitanoGreenButton = (props) => {
  return (
    <Button
      {...props}
      className={`bg-titano-green text-slate-800 transition shadow-lg shadow-titano-green/10 hover:shadow-titano-green/30 ${props.className}`}
    >
      {props.children}
    </Button>
  );
};
export const TitanoPinkButton = (props) => {
  return (
    <Button
      {...props}
      className={`bg-titano-pink text-white transition shadow-lg shadow-titano-pink/10 hover:shadow-titano-pink/30 ${props.className}`}
    >
      {props.children}
    </Button>
  );
};
