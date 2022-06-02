import { ScrollArea } from '@mantine/core';
import React from 'react';
import Aside from './Aside';

function Layout({ children, viewportRef }) {
  return (
    <div className="flex max-h-screen">
      <Aside></Aside>
      <div className="flex-1 flex justify-center items-center p-1 md:p-5 z-10 w-full">
        <div className="backdrop-blur-3xl bg-slate-800/50 overflow-hidden h-full w-full rounded-md p-1 md:p-5 shadow-xl shadow-titano-pink/5">
          <ScrollArea
            type="hover"
            style={{ height: '100vh', paddingBottom: '100px', width: '100%' }}
            viewportRef={viewportRef}
            offsetScrollbars
          >
            {children}
          </ScrollArea>
        </div>
      </div>

      <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center overflow-hidden">
        <div className="p-50 bg-titano-green h-96 w-96 rounded-full blur-3xl absolute top-[20%] left-[50%] opacity-10"></div>
        <div className="p-50 bg-titano-green h-80 w-80 rounded-full blur-3xl absolute opacity-20"></div>
        <div className="p-50 bg-titano-green h-96 w-96 rounded-full blur-3xl absolute bottom-[0%] left-[-100px] opacity-10"></div>
        <div className="p-60 bg-titano-pink h-80 w-80 rounded-full blur-3xl absolute opacity-10 bottom-[10%] left-[25%]"></div>
        <div className="p-60 bg-titano-pink h-80 w-80 rounded-full blur-3xl absolute opacity-10 top-[0%] right-[0%]"></div>
        <div className="p-60 bg-titano-pink h-80 w-80 rounded-full blur-3xl absolute opacity-10 bottom-[0%] right-[-100px]"></div>
        <div className="p-60 bg-titano-pink h-80 w-80 rounded-full blur-3xl absolute opacity-10 top-[-80px] left-[-100px]"></div>

        <div className="p-80 bg-titano-green h-96 w-96 rounded-full blur-3xl absolute bottom-[25%] left-[-350px] opacity-10"></div>
        <div className="p-80 bg-titano-pink h-96 w-96 rounded-full blur-3xl absolute bottom-[25%] right-[-350px] opacity-10"></div>

      </div>
    </div>
  );
}

export default Layout;
