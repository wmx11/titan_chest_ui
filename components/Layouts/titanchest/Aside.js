import React, { useState } from 'react';
import { Drawer, ScrollArea } from '@mantine/core';
import MenuLinksGroup from './MenuLinksGroup';
import { BrandCodesandbox } from 'tabler-icons-react';
import MenuAppend from './MenuAppend';
import useSmallScreen from '../../../hooks/useSmallScreen';

function Aside() {
  const [isOpen, setIsOpen] = useState(false);
  const { isSmallScreen } = useSmallScreen();

  return (
    <>
      <div
        className={`fixed bottom-0 w-full backdrop-blur-3xl bg-slate-900/60 shadow-xl shadow-titano-green/10 z-20 px-4 py-2 pb-0 md:bg-slate-800/50 md:px-3 md:py-6 md:relative md:min-h-screen md:flex flex-col justify-between md:w-60`}
      >
        <div>
          <div className="hidden md:block">
            <div className="text-white mb-4 text-2xl cursor-default select-none rounded-md bg-slate-900/40 px-4 py-3 relative">
              <p className="z-10 flex items-center gap-x-2">
                <BrandCodesandbox size={20} className="animate-pulse" /> Titan
                Chest
              </p>
              <div className="p-20 bg-titano-green h-20 w-20 rounded-full blur-3xl absolute bottom-0 left-[-50px] opacity-20 -z-10"></div>
              <div className="p-20 bg-titano-pink h-20 w-20 rounded-full blur-3xl absolute top-0 right-[-50px] opacity-10 -z-10"></div>
            </div>
          </div>
          <div>
            <ul className="text-sm flex items-center justify-between md:block">
              <MenuLinksGroup
                onBurgerClick={() => setIsOpen(true)}
                opened={isOpen}
                isDrawer={false}
              />

              <Drawer
                opened={isOpen}
                onClose={() => setIsOpen(false)}
                position="bottom"
                size="70%"
                classNames={{
                  drawer: 'backdrop-blur-md bg-slate-900/60 px-2',
                  closeButton: 'text-white mt-2 mr-1',
                }}
              >
                <div className="flex flex-col h-full">
                  <div className="overflow-hidden h-full">
                    <ScrollArea
                      type="auto"
                      style={{ height: '100%', width: '100%' }}
                    >
                      <MenuLinksGroup isDrawer={true} />
                    </ScrollArea>
                  </div>
                  <div className="h-[420px]">
                    <MenuAppend />
                  </div>
                </div>
              </Drawer>
            </ul>
          </div>
        </div>
        {!isSmallScreen && <MenuAppend />}
      </div>
    </>
  );
}

export default Aside;
