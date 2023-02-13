import { NextRequest, NextResponse } from 'next/server';

export const config = {
  runtime: 'experimental-edge',
};

export default async function getMovie(req: NextRequest) {
  const data = await fetch(
    `https://api.themoviedb.org/3/${req.headers.get(
      'mediatype'
    )}/${req.headers.get('idmedia')}?api_key=${
      process.env.API_KEY
    }&language=en-US&append_to_response=credits,keywords,recommendations,similar,videos,external_ids`
  ).then((response) => response.json());
  return NextResponse.json(data);
}
