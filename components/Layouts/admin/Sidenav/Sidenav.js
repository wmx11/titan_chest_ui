import { signOut } from 'next-auth/react';
import React from 'react';

function Sidenav({ homeTitle, homeHref, children }) {
  return (
    <aside className="flex flex-col bg-zinc-900 min-h-screen w-60 px-4">
      <div className="mt-4 mb-4">
        <a className="font-bold text-white" href={homeHref}>
          {homeTitle}
        </a>
        <div
          className="text-white text-sm mt-4 cursor-pointer"
          onClick={() => signOut()}
        >
          Logout
        </div>
      </div>
      {children}
    </aside>
  );
}

export default Sidenav;
