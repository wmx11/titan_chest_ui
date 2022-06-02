import titanoConfig from '../config/titano';

const getCompoundingEffect = (amount, days, interest = titanoConfig.halfHourInterest) => {
  if (!amount || !days) {
    return null;
  }

  return amount * (1 + interest) ** days;
};

export default getCompoundingEffect;
