import axios from 'axios';
import routes from '../config/routes';

const getApiHost = (isServerSide = false) => {
  return isServerSide
    ? process.env.HOST_API_INTERNAL
    : routes.titan_chest_axios;
};

/**
 * @param {object{}} id - ID to get
 * @param {object{}} type - Type to get | project | liquidity | stats | bots
 * @param {object{}} isServerSide - Is the call handled on server side
 * @returns object{} | null;
 */
const fetchFromApi = async ({ id, type, isServerSide }) => {
  try {
    const req = await fetch(`${getApiHost(isServerSide)}/${type}/get/${id}`);
    const { data } = await req.json();
    return data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const getProjectsList = async (id = '', isServerSide) => {
  const data = await fetchFromApi({ id, isServerSide, type: 'project' });
  return data;
};

export const getAbiList = async (id = '', isServerSide) => {
  const data = await fetchFromApi({ id, isServerSide, type: 'abi' });
  return data;
};

export const getNetworksList = async (id = '', isServerSide) => {
  const data = await fetchFromApi({ id, isServerSide, type: 'network' });
  return data;
};

export const getStatsList = async (id = '', isServerSide) => {
  const data = await fetchFromApi({ id, isServerSide, type: 'stats' });
  return data;
};

export const getTokensList = async (id = '', isServerSide) => {
  const data = await fetchFromApi({ id, isServerSide, type: 'token' });
  return data;
};

export const getLiquidityList = async (id = '', isServerSide) => {
  const data = await fetchFromApi({ id, isServerSide, type: 'liquidity' });
  return data;
};

export const getBotsList = async (id = '', isServerSide) => {
  const data = await fetchFromApi({ id, isServerSide, type: 'bots' });
  return data;
};

export const getBackedLiquidity = ({ rfv, treasury, liquidity }) => {
  if (!rfv && !liquidity && !treasury) {
    return null;
  }

  const assets = rfv + treasury;
  const backedLiquidity = (assets * 100) / liquidity;
  return `${backedLiquidity.toFixed()}%`;
};

export const getBalance = async (id = '', isServerSide) => {
  const data = await fetchFromApi({ id, isServerSide, type: 'account' });
  return data;
};

export const getCmsContent = async (id = '', isServerSide) => {
  try {
    const {
      data: { data },
    } = await axios({
      url: `${
        isServerSide ? process.env.TITAN_CHEST_CMS_URL : routes.titan_chest_cms
      }/${id}`,
      method: 'GET',
      headers: {
        Authorization: `Bearer ${
          isServerSide
            ? process.env.TITAN_CHEST_CMS_TOKEN
            : process.env.NEXT_PUBLIC_TITAN_CHEST_CMS_TOKEN
        }`,
      },
    });

    if (data === null) {
      return null;
    }

    if (Array.isArray(data)) {
      return data;
    }

    return data.attributes;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const getTransactions = async (id = '', isServerSide) => {
  try {
    const data = await axios({
      url: `${
        isServerSide
          ? process.env.TRANSACTION_WATCHER_URL
          : process.env.NEXT_PUBLIC_TRANSACTION_WATCHER_URL
      }/${id}`,
    });

    if (!data) {
      return null;
    }

    if (isServerSide) {
      return data.data.data;
    }

    return data.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const getHolders = async (id = '', isServerSide) => {
  try {
    const { data } = await axios({
      url: `${
        isServerSide
          ? `${process.env.HOLDERS_API}/`
          : process.env.NEXT_PUBLIC_HOLDERS_API
      }${id}`,
    });

    if (!data) {
      return null;
    }

    if (isServerSide) {
      return data;
    }

    return data;
  } catch (error) {
    console.log(error);
    return null;
  }
};
