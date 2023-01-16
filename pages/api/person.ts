import type { NextApiRequest, NextApiResponse } from 'next';

export default async function getPerson(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const data = await fetch(
    `https://api.themoviedb.org/3/person/${req.query.idperson}?api_key=${process.env.API_KEY}&language=en-US&append_to_response=combined_credits,external_ids,images`
  ).then((response) => response.json());
  res.json(data);
}
