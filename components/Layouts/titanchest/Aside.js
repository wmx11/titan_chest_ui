import React, { useState } from 'react';
import { Drawer } from '@mantine/core';
import MenuLinksGroup from './MenuLinksGroup';
import { BrandCodesandbox } from 'tabler-icons-react';

function Aside() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className={`fixed bottom-0 w-full backdrop-blur-3xl bg-slate-900/60 shadow-xl shadow-titano-green/10 z-20 px-4 py-2 pb-0 md:bg-slate-800/50 md:px-3 md:py-6 md:relative md:min-h-screen md:block md:w-60`}
    >
      <div className="hidden md:block">
        <div className="text-white mb-4 text-2xl cursor-default select-none rounded-md bg-slate-900/40 px-4 py-3 relative">
          <p className="z-10 flex items-center gap-x-2">
            <BrandCodesandbox size={20} /> Titan Chest
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
            size="50%"
            classNames={{
              drawer: 'backdrop-blur-md bg-slate-900/60 px-2',
              closeButton: 'hidden',
            }}
          >
            <MenuLinksGroup isDrawer={true} />
          </Drawer>
        </ul>
      </div>
    </div>
  );
}

export default Aside;
