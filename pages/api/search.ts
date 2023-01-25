import type { NextApiRequest, NextApiResponse } from 'next';

export default async function getSearch(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const data = await fetch(
    `https://api.themoviedb.org/3/search/multi?api_key=${process.env.API_KEY}&language=en-US&query=${req.query.searchquery}&page=1`
  ).then((response) => response.json());
  res.json(data);
}
