import React from 'react';

function SmallText({ children, className, html }) {
  const classNames = `text-slate-100 text-xs px-2 mt-1 ${className}`;

  if (html !== '' && html !== undefined) {
    return (
      <div
        className={classNames}
        dangerouslySetInnerHTML={{ __html: html }}
      ></div>
    );
  }

  return <p className={classNames}>{children}</p>;
}

export default SmallText;
