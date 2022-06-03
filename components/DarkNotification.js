import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';
import DarkBox from './DarkBox';
import Dialog from './Dialog';
import NeonText from './NeonText';

function DarkNotification({ text, data, href, useStorage, instantOpen }) {
  const STORAGE_NAME = `notification_${href}`;
  const EXPIRATION_DATE = 12 * 60 * 60 * 1000;
  const TIMESTAMP = new Date().getTime();
  const EXPIRES = TIMESTAMP + EXPIRATION_DATE;

  const storageData = {
    closed: false,
    timestamp: TIMESTAMP,
    expires: EXPIRES,
  };

  const [opened, setOpened] = useState(false);
  const [value, setValue] = useLocalStorage(STORAGE_NAME, storageData);

  const hasExpired = () => {
    return TIMESTAMP >= value.expires;
  };

  useEffect(() => {
    if (useStorage) {
      const newData = { ...storageData };
      if (hasExpired()) {
        newData.closed = false;
        setValue(newData);
      }
    }

    if (instantOpen && value.closed !== true) {
      setTimeout(() => {
        setOpened(true);
      }, 500);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  const handleClose = () => {
    if (useStorage) {
      if (value.closed === false) {
        const newData = { ...storageData };
        newData.closed = true;
        setValue(newData);
      }
    }
    setOpened(false);
  };

  if (!data) {
    return;
  }

  if (!data.length) {
    return;
  }

  return (
    <Dialog
      opened={opened}
      onClose={handleClose}
      onClick={handleClose}
      withCloseButton
      position={{ top: 20, right: 20 }}
    >
      <DarkBox className="mb-4 text-white text-center">
        {href ? (
          <Link href={href}>
            <a>
              <NeonText>{text}</NeonText>
            </a>
          </Link>
        ) : (
          <NeonText>{text}</NeonText>
        )}
      </DarkBox>
    </Dialog>
  );
}

export default DarkNotification;
