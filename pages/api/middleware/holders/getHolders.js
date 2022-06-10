// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { getHolders } from '../../../../utils/getters';

export default async function handler(req, res) {
  if (
    req.query.hasOwnProperty('get-position') &&
    req.query.hasOwnProperty('address')
  ) {
    const data = await getHolders(`get-position/${req.query.address}`, true);

    if (!data) {
      return res.status(404).json({ error: 'No data found' });
    }

    return res.status(200).json(data);
  }

  const queryString =
    Object.keys(req.query)
      .map((key) => `${key}=${req.query[key]}`)
      .join('&') || '';

  const data = await getHolders(`holders?${queryString}`, true);

  if (!data) {
    return res.status(404).json({ error: 'No data found' });
  }

  return res.status(200).json(data);
}
