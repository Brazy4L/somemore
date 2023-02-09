import { NextRequest, NextResponse } from 'next/server';

export const config = {
  runtime: 'experimental-edge',
};

export default async function getPerson(req: NextRequest) {
  const data = await fetch(
    `https://api.themoviedb.org/3/person/${req.headers.get(
      'idperson'
    )}?api_key=${
      process.env.API_KEY
    }&language=en-US&append_to_response=combined_credits,external_ids,images`
  ).then((response) => response.json());
  return NextResponse.json(data);
}
