import { NextRequest, NextResponse } from 'next/server';

export const config = {
  runtime: 'experimental-edge',
};

export default async function getSearch(req: NextRequest) {
  const data = await fetch(
    `https://api.themoviedb.org/3/search/multi?api_key=${
      process.env.API_KEY
    }&language=en-US&query=${req.headers.get('searchquery')}&page=1`
  ).then((response) => response.json());
  return NextResponse.json(data);
}
