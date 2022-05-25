import React from 'react';
import Link from 'next/link';

function MenuLink({ href, title, Icon }) {
  return (
    <Link href={href}>
      <a className="hover:bg-zinc-800 rounded-md px-4 py-2 mb-1 flex items-center text-slate-300 text-sm">
        {Icon && <Icon className="h-5 w-5 text-slate-500 mr-3" />}
        {title}
      </a>
    </Link>
  );
}

export default MenuLink;
