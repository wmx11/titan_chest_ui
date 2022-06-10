import { GlobeIcon } from '@heroicons/react/solid';
import React, { useState } from 'react';
import { BrandDiscord, BrandTelegram, BrandTwitter } from 'tabler-icons-react';
import DonateModal from '../../DonateModal';

function MenuAppend() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <DonateModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      <div className="relative">
        <div className="fixed bottom-0 left-0 right-0 md:right-[unset] p-5">
          <div className="text-slate-300 text-sm px-4 mb-4">
            <p>Official Titano links</p>
          </div>
          <div className="text-slate-300 flex justify-between mb-4 px-4">
            <a
              href="https://discord.gg/qrnF5eqc64"
              target="_blank"
              rel="noreferrer"
            >
              <BrandDiscord className="h-5 w-5" />
            </a>
            <a
              href="https://t.me/titano_finance"
              target="_blank"
              rel="noreferrer"
            >
              <BrandTelegram className="h-5 w-5" />
            </a>
            <a
              href="https://twitter.com/TitanoFinance"
              target="_blank"
              rel="noreferrer"
            >
              <BrandTwitter className="h-5 w-5" />
            </a>
            <a href="https://titano.finance/" target="_blank" rel="noreferrer">
              <GlobeIcon className="h-5 w-5" />
            </a>
          </div>
          <div className="text-slate-300 text-sm px-4 pt-4">
            <p>Like this content?</p>
            <p
              className="underline-offset-1 underline cursor-pointer"
              onClick={() => setIsModalOpen(true)}
            >
              Buy me some nuggets 💚
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default MenuAppend;
