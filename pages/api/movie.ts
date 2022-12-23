import type { NextApiRequest, NextApiResponse } from 'next';

export default async function getPopularMovies(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const data = await fetch(
    `https://api.themoviedb.org/3/movie/${req.query.idmovie}?api_key=${process.env.API_KEY}&language=en-US`
  ).then((response) => response.json());
  res.json(data);
}
