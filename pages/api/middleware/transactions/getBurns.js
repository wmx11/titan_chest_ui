// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { getTransactions } from '../../../../utils/getters';

export default async function handler(req, res) {
  const data = await getTransactions('get/burns?limit=100', true);

  if (!data) {
    return res.status(404).json({ error: 'No data found' });
  }
  return res.status(200).json(data);
}
