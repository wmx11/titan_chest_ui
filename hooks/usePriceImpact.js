import React, { useState, useEffect, useCallback } from 'react';
import { getStatsList } from '../utils/getters';

const initialState = {
  imapct: null,
  price: null,
  pair_price: null,
  liquidity: null,
  bnb_amount: null,
  titano_amount: null,
  received: null,
};

const cache = { titano: {} };

const usePriceImpact = ({
  transactionType,
  transactionCurrency,
  transactionAmount,
}) => {
  const [currentData, setCurrentData] = useState(initialState);
  const [results, setResults] = useState();
  const [constantProduct, setConstantProduct] = useState(0);
  const [currency, setCurrency] = useState(transactionCurrency || 'titano');
  const [type, setType] = useState(transactionType || 'sell');
  const [amount, setAmount] = useState(transactionAmount || 1);

  const getTitanoData = async () => {
    if (!Object.keys(cache.titano).length) {
      const titano = await getStatsList('Titano', false);
      cache.titano = { ...titano[0] };
      return cache.titano;
    }

    return cache.titano;
  };

  const getAmount = useCallback(() => {
    if (currency === 'usd') {
      return amount / currentData.price;
    }

    return amount;
  }, [amount, currency, currentData]);

  // Titano in, BNB out
  const handleSell = useCallback(() => {
    if (!currentData) {
      return;
    }

    const titano_amount = currentData.titano_amount + getAmount();
    const bnb_amount = constantProduct / titano_amount;
    const titanoBnb = bnb_amount / titano_amount;
    const liquidity = bnb_amount * currentData.pair_price;
    const price = titanoBnb * currentData.pair_price;

    setResults({
      impact: ((price * 100) / currentData.price - 100 || 0).toFixed(3),
      price: price || 0,
      liquidity: liquidity || 0,
      bnb_amount: bnb_amount || 0,
      titano_amount: titano_amount || 0,
      received: currentData.bnb_amount - bnb_amount || 0,
    });
  }, [constantProduct, currentData, getAmount]);

  // BNB in, Titano out
  const handleBuy = useCallback(() => {
    if (!currentData) {
      return;
    }

    const bnb_amount =
      currentData.bnb_amount +
      getAmount() * (currentData.bnb_amount / currentData.titano_amount);

    const titano_amount = constantProduct / bnb_amount;

    const titanoBnb = bnb_amount / titano_amount;
    const liquidity = bnb_amount * currentData.pair_price;
    const price = titanoBnb * currentData.pair_price;

    setResults({
      impact: ((price * 100) / currentData.price - 100 || 0).toFixed(3),
      price: price || 0,
      liquidity: liquidity || 0,
      bnb_amount: bnb_amount || 0,
      titano_amount: titano_amount || 0,
      received: currentData.titano_amount - titano_amount || 0,
    });
  }, [constantProduct, currentData, getAmount]);

  const calculate = useCallback(() => {
    switch (type) {
      case 'buy':
        handleBuy();
        break;
      case 'sell':
        handleSell();
        break;
      default:
        break;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [type, currency, amount]);

  const calculateTitanoData = useCallback(async () => {
    const titanoData = await getTitanoData();
    const { price, pair_price, liquidity } = titanoData;

    setCurrentData({
      price,
      pair_price,
      liquidity,
      bnb_amount: liquidity / pair_price,
      titano_amount: liquidity / price,
    });

    setConstantProduct((liquidity / pair_price) * (liquidity / price));
    calculate();
  }, [calculate]);

  useEffect(() => {
    calculateTitanoData();
  }, [calculateTitanoData]);

  return {
    impactResults: results,
    amount,
    type,
    currency,
    titano: currentData,
    setAmount,
    setType,
    setCurrency,
    calculate,
    calculateTitanoData
  };
};

export default usePriceImpact;
