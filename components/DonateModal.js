import { Modal } from '@mantine/core';
import Image from 'next/image';
import React from 'react';

function DonateModal({ isOpen, onClose }) {
  return (
    <Modal opened={isOpen} onClose={onClose}>
      <div className="flex flex-col items-center">
        <p className="mb-4">You can send your donations to this address💚</p>
        <p className="mb-4">0xb3A7Ab89c3a0e209b45338f1eCe30Dc246C0c4c0</p>
        <Image
          src="/donateQR.png"
          alt="Donation QR Code"
          height={235}
          width={235}
        />
      </div>
    </Modal>
  );
}

export default DonateModal;
