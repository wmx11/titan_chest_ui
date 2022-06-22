import { useEffect, useState } from 'react';
import useSWR, { useSWRConfig } from 'swr';
import titanoConfig from '../config/titano';
import { getBalance, getHolders } from '../utils/getters';

const initialState = {
  address: null,
  rank: null,
  tier: null,
  balance: null,
};

function useHolderData(walletAddress) {
  const [state, setState] = useState(initialState);
  const [address, setAddress] = useState();
  const { mutate } = useSWRConfig();

  const { data } = useSWR('holder', async () => {
    if (address) {
      const position = await getHolders(
        `?get-position&address=${address}`,
        false
      );
      const balance = await getBalance(`balance?address=${address}`, false);

      return { position, balance };
    }

    return {};
  });

  const getWalletTier = (amount) => {
    const tiers = titanoConfig.walletTiers.filter(
      ({ value }) => amount <= value
    );

    if (tiers.length) {
      return tiers[0].name;
    }

    return 'Probably plankton? 🦠';
  };

  const initHook = async () => {
    const position = data?.position;
    const balance = data?.balance;
    const tier = getWalletTier(position?.address?.wallet?.value);
    const newState = { ...state };

    newState.address = address;
    newState.rank = position?.address?.position;
    newState.tier = tier;
    newState.balance = balance;

    setState(newState);
  };

  useEffect(() => {
    if (walletAddress) {
      setAddress(walletAddress);
    }

    if (address) {
      mutate('holder');
    }

    initHook();
    
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [address, walletAddress, data]);

  return { holder: state, setAddress, address };
}

export default useHolderData;
