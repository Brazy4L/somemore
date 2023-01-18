import type { NextApiRequest, NextApiResponse } from 'next';

export default async function getMovie(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const data = await fetch(
    `https://api.themoviedb.org/3/${req.query.type}/${req.query.idmedia}?api_key=${process.env.API_KEY}&language=en-US&append_to_response=credits,keywords,recommendations,similar,videos,external_ids`
  ).then((response) => response.json());
  res.json(data);
}
