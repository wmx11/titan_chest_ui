import React, { useState } from 'react';
import { Drawer } from '@mantine/core';
import MenuLinksGroup from './MenuLinksGroup';

function Aside() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className={`fixed bottom-0 w-full backdrop-blur-3xl bg-slate-900/60 shadow-xl shadow-titano-green/10 z-20 px-4 py-2 pb-0 md:bg-slate-800/50 md:px-3 md:py-6 md:relative md:min-h-screen md:block md:w-60`}
    >
      <div className="px-4 hidden md:block">
        <p className="text-white mb-4 text-2xl cursor-default select-none">
          Titan Chest
        </p>
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
