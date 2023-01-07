import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import Head from 'next/head';
import { toUrl, getDate } from './utils';

export default function PersonPage() {
  const { query } = useRouter();
  const fetcher = (url: RequestInfo | URL) =>
    fetch(url).then((res) => res.json());
  const { data, error, isLoading } = useSWR(
    `/api/person?idperson=${query.id}`,
    fetcher
  );

  if (error) return <div>Failed to load</div>;
  if (isLoading) return <div>Loading...</div>;

  let undefinedCastCredits: Array<any> = [];
  let definedCastCredits: Array<any> = [];

  data.combined_credits.cast.filter(function (el: {
    release_date: string;
    first_air_date: string;
  }) {
    el.release_date || el.first_air_date
      ? definedCastCredits.push(el)
      : undefinedCastCredits.push(el);
  });

  const sortedCastCredits = definedCastCredits.sort((a, b) => {
    return (
      +new Date(b.release_date || b.first_air_date) -
      +new Date(a.release_date || a.first_air_date)
    );
  });

  const castCredits = sortedCastCredits.concat(undefinedCastCredits);

  const checkType = (el: string) => {
    return el === 'movie' ? 'movies' : 'tvshows';
  };

  const checkGender = (el: number) => {
    return el === 1 ? 'Actress:' : 2 ? 'Actor:' : null;
  };

  return (
    <>
      <Head>
        <title>{data.name} | SOMEMORE</title>
      </Head>
      <div className="mx-auto box-content grid max-w-[1280px] gap-4 pb-8 text-slate-50">
        <div className="grid gap-2 min-[600px]:grid-flow-col">
          <Image
            className="justify-self-center rounded-2xl"
            width={342}
            height={513}
            src={`https://image.tmdb.org/t/p/w342${data.profile_path}`}
            alt=""
            placeholder="blur"
            blurDataURL={
              'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAIAAAADCAYAAAC56t6BAAAAEklEQVR42mNMX/OkngEIGDEYAHIAB2ZYiQm7AAAAAElFTkSuQmCC'
            }
          />
          <div className="grid gap-4 px-2">
            <div className="font-bold">{data.name}</div>
            <div className="h-[2px] w-full rounded-full bg-[#67ace4]"></div>
            <div>{data.biography}</div>
            <div className="h-[2px] w-full rounded-full bg-[#67ace4]"></div>
            <div className="flex flex-wrap items-end justify-center gap-4">
              {data.imdb_id && (
                <Link
                  className="h-min cursor-pointer rounded-full bg-gray-700 p-2 transition-colors hover:bg-gray-600"
                  href={`https://www.imdb.com/name/${data.imdb_id}/`}
                  target="_blank"
                  rel="noopener"
                >
                  IMDb
                </Link>
              )}
              {data.external_ids.twitter_id && (
                <Link
                  className="h-min cursor-pointer rounded-full bg-gray-700 p-2 transition-colors hover:bg-gray-600"
                  href={`https://twitter.com/${data.external_ids.twitter_id}`}
                  target="_blank"
                  rel="noopener"
                >
                  Twitter
                </Link>
              )}
              {data.external_ids.instagram_id && (
                <Link
                  className="h-min cursor-pointer rounded-full bg-gray-700 p-2 transition-colors hover:bg-gray-600"
                  href={`https://instagram.com/${data.external_ids.instagram_id}/`}
                  target="_blank"
                  rel="noopener"
                >
                  Instagram
                </Link>
              )}
              {data.external_ids.facebook_id && (
                <Link
                  className="h-min cursor-pointer rounded-full bg-gray-700 p-2 transition-colors hover:bg-gray-600"
                  href={`https://www.facebook.com/${data.external_ids.facebook_id}/`}
                  target="_blank"
                  rel="noopener"
                >
                  Facebook
                </Link>
              )}
            </div>
          </div>
        </div>
        <div className="text-4xl font-bold">Credits:</div>
        {data.gender && (
          <div className="text-2xl font-bold">{checkGender(data.gender)}</div>
        )}
        <div className="grid">
          {castCredits.map(
            (el: {
              id: number;
              poster_path: string;
              release_date: string;
              title: string;
              character: string;
              media_type: string;
              name: string;
              first_air_date: string;
              episode_count: number;
            }) => (
              <div key={el.id}>
                <div className="p-1">
                  <Link
                    className="flex"
                    href={{
                      pathname: `/${checkType(el.media_type)}/${el.id}`,
                      query: `${toUrl(el.title || el.name)}`,
                    }}
                  >
                    <div className="flex flex-shrink-0 items-center">
                      <Image
                        className="rounded-2xl"
                        width={92}
                        height={138}
                        src={`https://image.tmdb.org/t/p/w92${el.poster_path}`}
                        alt=""
                        placeholder="blur"
                        blurDataURL={
                          'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAIAAAADCAYAAAC56t6BAAAAEklEQVR42mNMX/OkngEIGDEYAHIAB2ZYiQm7AAAAAElFTkSuQmCC'
                        }
                      />
                    </div>
                    <div className="flex flex-col justify-center pl-4">
                      {el.title && <div className="font-bold">{el.title}</div>}
                      {el.name && <div className="font-bold">{el.name}</div>}
                      <div className="text-slate-400">{el.character}</div>
                      <div className="text-slate-400">
                        {el.media_type}{' '}
                        {el.episode_count && (
                          <span>({el.episode_count} episode(s))</span>
                        )}
                      </div>
                      {el.release_date && <div>{getDate(el.release_date)}</div>}
                      {el.first_air_date && (
                        <div>{getDate(el.first_air_date)}</div>
                      )}
                    </div>
                  </Link>
                </div>
                <div className="h-[2px] w-full rounded-full bg-[#67ace4]"></div>
              </div>
            )
          )}
        </div>
      </div>
    </>
  );
}
