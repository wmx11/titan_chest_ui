import React from 'react';
import Heading from './Heading';

function Table({ headings, children }) {
  return (
    <table className="border-collapse table-fixed w-full text-sm">
      <thead>
        <tr>
          {headings &&
            headings.map(
              (heading) => heading && <Heading key={heading}>{heading}</Heading>
            )}
        </tr>
      </thead>
      <tbody className="bg-white dark:bg-slate-800">{children}</tbody>
    </table>
  );
}

export default Table;
