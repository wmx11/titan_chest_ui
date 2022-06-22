import { showNotification } from '@mantine/notifications';
import WalletConnectProvider from '@walletconnect/web3-provider';
import React, { useEffect, useState } from 'react';
import Web3Modal from 'web3modal';

const providerOptions = {
  walletconnect: {
    package: WalletConnectProvider,
    options: {
      network: 'binance',
      rpc: {
        56: 'https://bsc-dataseed.binance.org/',
      },
    },
    network: 'mainnet',
  },
  binancechainwallet: {
    package: true,
  },
};

const subscribeToProvider = (provider, setAddress) => {
  provider.on('connect', (data) => {});

  provider.on('disconnect', (data) => {
    setAddress(null);
  });

  provider.on('chainChanged', (data) => {
    console.log(data);
  });

  provider.on('accountsChanged', (accounts) => {
    setAddress(accounts[0]);
  });
};

const connect = async (web3Auth, setAddress) => {
  try {
    const provider = await web3Auth.connect();
    subscribeToProvider(provider, setAddress);
    setAddress(provider.selectedAddress);
  } catch (error) {
    console.log(error);
    showNotification({
      title: 'Error',
      message: JSON.stringify(error.message),
      color: 'red',
    });
  }
};

function useConnectWallet() {
  const [state, setState] = useState();
  const [address, setAddress] = useState();
  const [web3Modal, setWeb3Modal] = useState();

  useEffect(() => {
    if (!web3Modal) {
      const web3Auth = new Web3Modal({
        providerOptions,
        cacheProvider: true,
        network: 'mainnet',
      });

      setWeb3Modal(web3Auth);

      if (web3Auth.cachedProvider) {
        connect(web3Auth, setAddress);
      }
    }
  }, []);

  const disconnect = async () => {};

  return { address, connect: () => connect(web3Modal, setAddress), disconnect };
}

export default useConnectWallet;
