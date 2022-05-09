import routes from '../config/routes';

export const getProjectsList = async (id = '') => {
  try {
    const req = await fetch(`${routes.titan_chest}/project/get/${id}`);
    const { data } = await req.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getAbiList = async (id = '') => {
  const req = await fetch(`${routes.titan_chest}/abi/get/${id}`);
  const { data } = await req.json();
  return data;
};

export const getNetworksList = async (id = '') => {
  const req = await fetch(`${routes.titan_chest}/network/get/${id}`);
  const { data } = await req.json();
  return data;
};

export const getStatsList = async (id = '') => {
  const req = await fetch(`${routes.titan_chest}/stats/get/${id}`);
  const { data } = await req.json();
  return data;
};

export const getTokensList = async (id = '') => {
  const req = await fetch(`${routes.titan_chest}/token/get/${id}`);
  const { data } = await req.json();
  return data;
};

export const getLiquidityList = async (id = '') => {
  const req = await fetch(`${routes.titan_chest}/liquidity/get/${id}`);
  const { data } = await req.json();
  return data;
};

export const getBotsList = async (id = '') => {
  const req = await fetch(`${routes.titan_chest}/bots/get/${id}`);
  const { data } = await req.json();
  return data;
};
