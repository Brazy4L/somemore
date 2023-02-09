import { NextRequest, NextResponse } from 'next/server';

export const config = {
  runtime: 'experimental-edge',
};

export default async function getPopularMedia(req: NextRequest) {
  const data = await fetch(
    `https://api.themoviedb.org/3/${req.headers.get(
      'mediatype'
    )}/popular?api_key=${
      process.env.API_KEY
    }&language=en-US&region=US&page=${req.headers.get('pagenumber')}`
  ).then((response) => response.json());
  return NextResponse.json(data);
}
