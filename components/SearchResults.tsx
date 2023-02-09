import Link from 'next/link';
import { useRouter } from 'next/router';
import Head from 'next/head';
import useSWR from 'swr';
import CustomImage from './CustomImage';
import questionTall from '../public/question-tall.svg';
import Spinner from './Spinner';
import LoadingError from './LoadingError';
import { toUrl, getDate } from './utils';
import Rating from './Rating';

export default function SearchResults() {
  const { query } = useRouter();
  const fetcher = (url: RequestInfo | URL) =>
    fetch(url, { headers: { searchquery: `${query.id}` } }).then((res) =>
      res.json()
    );
  const { data, error, isLoading } = useSWR(`/api/search?${query.id}`, fetcher);

  if (error) return <LoadingError />;
  if (isLoading) return <Spinner />;

  const checkType = (el: string) => {
    return el === 'movie' ? 'movie' : el === 'tv' ? 'tv' : 'person';
  };

  return (
    <>
      <Head>
        <title>{query.id} | SOMEMORE</title>
      </Head>
      <div className="mx-auto box-content grid max-w-[1280px] gap-2 px-2 pb-8 min-[1150px]:grid-cols-2">
        {data.results.map(
          (
            el: {
              id: number;
              title: string;
              media_type: string;
              poster_path: string;
              name: string;
              release_date: string;
              first_air_date: string;
              vote_average: number;
              vote_count: number;
              profile_path: string;
            },
            index: number
          ) => (
            <Link
              className="flex gap-4 rounded-2xl bg-gray-200 p-2 transition-colors hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-800"
              key={index}
              href={{
                pathname: `/${checkType(el.media_type)}/${el.id}`,
                query: `${toUrl(el.title || el.name)}`,
              }}
            >
              <div className="flex-shrink-0">
                <CustomImage
                  key={el.poster_path || el.profile_path}
                  className="rounded-2xl"
                  width={64}
                  height={96}
                  src={`https://image.tmdb.org/t/p/w92${
                    el.poster_path || el.profile_path
                  }`}
                  fallbackSrc={questionTall}
                />
              </div>
              <div className="flex flex-grow flex-col justify-center">
                {(el.title || el.name) && (
                  <div className="font-bold">{el.title || el.name}</div>
                )}
                {el.media_type && (
                  <div className="text-gray-600 dark:text-gray-400">
                    {el.media_type}
                  </div>
                )}
                {(el.release_date || el.first_air_date) && (
                  <div>{getDate(el.release_date || el.first_air_date)}</div>
                )}
              </div>
              {el.vote_count > 0 && (
                <div className="h-[40px] w-[40px] flex-shrink-0 self-center">
                  <div className="peer">
                    <Rating vote={el.vote_average} />
                  </div>
                  <span className="pointer-events-none relative bottom-[100%] right-[420%] mx-auto flex w-max justify-center rounded-2xl bg-gray-300 p-2 opacity-0 shadow shadow-black transition-opacity duration-300 peer-hover:opacity-100 dark:bg-gray-800">
                    User Ratings: {el.vote_count}
                  </span>
                </div>
              )}
            </Link>
          )
        )}
        {(!data.results || Boolean(!data.results.length)) && (
          <div className="col-span-2 flex h-[calc(100vh-60px-2rem)] translate-y-4 items-center justify-center text-center">
            No results found for &quot;{query.id}&quot;
          </div>
        )}
      </div>
    </>
  );
}
