import styles from '../styles/carousel.module.css';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Head from 'next/head';
import useSWR from 'swr';
import { toUrl, getDate, checkPlural } from './utils';
import Trailer from './Trailer';
import CustomImage from './CustomImage';
import questionTall from '../public/question-tall.svg';
import questionWide from '../public/question-wide.svg';
import Spinner from './Spinner';
import LoadingError from './LoadingError';
import Rating from './Rating';
import Carousel from './Carousel';

interface trailer {
  key: string;
}

export default function MediaPage({ type }: { type: string }) {
  const { query } = useRouter();
  const [watch, setWatch] = useState(false);
  const [trailer, setTrailer] = useState<trailer>();
  const [crewCredits, setCrewCredits] = useState<Array<any>>([]);
  const fetcher = (url: RequestInfo | URL) =>
    fetch(url).then((res) => res.json());
  const { data, error, isLoading } = useSWR(
    `/api/media?type=${type}&idmedia=${query.id}`,
    fetcher,
    {
      onSuccess: (data, key, config) => {
        setTrailer(
          data.videos.results.find((el: { type: string }) => {
            return el.type === 'Trailer';
          })
        );
        setCrewCredits(
          data.credits.crew
            .filter(
              (el: { job: string }) =>
                el.job === 'Director' || el.job === 'Screenplay'
            )
            .sort((a: { job: string }, b: { job: string }) =>
              a.job.localeCompare(b.job)
            )
        );
      },
    }
  );

  useEffect(() => {
    let current = JSON.parse(localStorage.getItem('watchlist') || '[]');
    let entry = { type, id: query.id };
    setWatch(findMatch(current, entry));
  }, [query.id, type]);

  const findMatch = (arr: any, el: { type: any; id: any }) => {
    for (const item of arr) {
      if (item.type === el.type && item.id === el.id) {
        return true;
      }
    }
    return false;
  };

  function reject(
    array: any[],
    iteratorFunction: { (item: any): boolean; (arg0: any): any }
  ) {
    return array.filter((item: any) => {
      return !iteratorFunction(item);
    });
  }

  const addToWatchlist = () => {
    let current = JSON.parse(localStorage.getItem('watchlist') || '[]');
    let entry = {
      type,
      id: query.id,
      title: data.title || data.name,
      poster: data.poster_path,
      release: data.release_date || data.first_air_date,
    };
    if (!findMatch(current, entry)) {
      localStorage.setItem('watchlist', JSON.stringify([entry, ...current]));
      setWatch(!watch);
    }
    if (findMatch(current, entry)) {
      let removed = reject(
        current,
        (item: { type: string; id: string | string[] | undefined }) => {
          return item.type === entry.type && item.id === entry.id;
        }
      );
      localStorage.setItem('watchlist', JSON.stringify(removed));
      setWatch(!watch);
    }
  };

  const checkProduction = (el: boolean) => {
    return el ? 'Returning Series' : !el ? 'Ended' : null;
  };

  if (error) return <LoadingError />;
  if (isLoading) return <Spinner />;

  return (
    <>
      <Head>
        <title>{data.title || data.name} | SOMEMORE</title>
      </Head>
      <div className="mx-auto box-content grid max-w-[1280px] grid-cols-[3fr,8fr] gap-4 pb-8">
        <div className="col-span-2 col-start-1 row-span-3 row-start-1">
          <CustomImage
            key={data.backdrop_path}
            className="min-[540px]:rounded-2xl min-[540px]:brightness-[0.5]"
            width={1280}
            height={720}
            src={`https://image.tmdb.org/t/p/w1280${data.backdrop_path}`}
            fallbackSrc={questionWide}
          />
        </div>
        <div className="z-10 col-start-1 row-start-1 hidden self-center min-[540px]:ml-3 min-[540px]:block min-[1000px]:ml-12">
          <CustomImage
            key={data.poster_path}
            width={780}
            height={1170}
            src={`https://image.tmdb.org/t/p/w780${data.poster_path}`}
            fallbackSrc={questionTall}
          />
        </div>
        <div className="z-10 col-span-2 col-start-1 row-start-3 px-2 py-2 text-xl font-bold text-gray-50 [text-shadow:_0px_1px_10px_rgb(0_0_0_/_100%)] min-[540px]:row-start-2 min-[540px]:px-3 min-[540px]:py-0 min-[540px]:text-2xl min-[1000px]:px-12 min-[1000px]:text-4xl">
          {data.title || data.name}
        </div>
        <div className="z-10 col-span-2 col-start-1 flex flex-wrap justify-between gap-2 px-2 min-[540px]:row-start-3 min-[540px]:px-3 min-[540px]:text-gray-50 min-[1000px]:px-12 min-[1000px]:pr-32">
          <div className="min-[540px]:[text-shadow:_0px_1px_10px_rgb(0_0_0_/_100%)]">
            {(data.release_date || data.first_air_date) && (
              <div>
                Release Date:{' '}
                {getDate(data.release_date || data.first_air_date)}
              </div>
            )}
          </div>
          {(data.external_ids.imdb_id || data.imdb_id) && (
            <Link
              className="font-bold min-[540px]:[text-shadow:_0px_1px_10px_rgb(0_0_0_/_100%)]"
              href={`https://www.imdb.com/title/${
                data.external_ids.imdb_id || data.imdb_id
              }/`}
              target="_blank"
              rel="noopener"
            >
              🔗 IMDb
            </Link>
          )}
        </div>
        {trailer && (
          <div className="z-10 col-span-2 aspect-video self-center min-[540px]:col-span-1 min-[540px]:col-start-2 min-[540px]:row-start-1 min-[540px]:mr-8 min-[1000px]:mr-32">
            <Trailer trailerKey={trailer.key} />
          </div>
        )}
        <div className="col-span-2 mx-2 grid gap-4 min-[700px]:grid-flow-col">
          {((data.genres && Boolean(data.genres.length)) ||
            data.tagline ||
            data.overview) && (
            <div className="flex flex-col gap-4 rounded-2xl bg-gray-200 p-2 dark:bg-gray-700">
              <button
                className="rounded-2xl bg-gray-300 p-2 transition-colors hover:bg-gray-400 dark:bg-gray-800 dark:hover:bg-gray-900"
                onClick={addToWatchlist}
              >
                <div className="mx-auto grid w-fit grid-cols-[24px,1fr] grid-rows-2 gap-x-2">
                  {watch ? (
                    <svg
                      className="row-span-2 textge self-center fill-none stroke-green-600 dark:stroke-[rgb(0,255,140)]"
                      width="24"
                      height="24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-width="4"
                        d="m3.5 11 7 9 11-17"
                      />
                    </svg>
                  ) : (
                    <svg
                      className="row-span-2 self-center fill-none stroke-gray-900 dark:stroke-gray-50"
                      width="24"
                      height="24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-width="4"
                        d="M21 12H3m9-9v18"
                      />
                    </svg>
                  )}
                  <div className="justify-self-start font-bold">
                    Add to Watchlist
                  </div>
                  <div className="justify-self-start text-gray-600 dark:text-gray-400">
                    Added by {Math.round(data.popularity)} users
                  </div>
                </div>
              </button>
              {data.genres && Boolean(data.genres.length) && (
                <div className="flex flex-wrap gap-2">
                  {data.genres.map((el: { id: number; name: string }) => (
                    <div
                      className="rounded-2xl border-4 border-gray-300 px-2 py-1 dark:border-gray-800"
                      key={el.id}
                    >
                      {el.name}
                    </div>
                  ))}
                </div>
              )}
              {data.tagline && (
                <div className="self-center italic">{data.tagline}</div>
              )}
              {data.overview && <div>{data.overview}</div>}
            </div>
          )}
          {(data.status ||
            data.in_production ||
            data.production_countries ||
            data.number_of_seasons ||
            data.number_of_episodes ||
            data.vote_count > 1 ||
            (data.created_by && Boolean(data.created_by.length)) ||
            (crewCredits && Boolean(crewCredits.length)) ||
            (data.keywords.keywords &&
              Boolean(data.keywords.keywords.length)) ||
            (data.keywords.results &&
              Boolean(data.keywords.results.length))) && (
            <div className="flex flex-col gap-4 rounded-2xl bg-gray-200 p-2 dark:bg-gray-700">
              <div className="flex flex-wrap items-center justify-center gap-2 rounded-2xl p-2">
                {(data.status || data.in_production) && (
                  <div className="font-semibold">
                    {data.status || checkProduction(data.in_production)}
                  </div>
                )}
                {data.status &&
                  ((data.production_countries &&
                    Boolean(data.production_countries.length)) ||
                    (data.number_of_seasons && data.number_of_episodes) ||
                    data.vote_count > 0) && (
                    <div className="h-[2rem] w-[1px] bg-gray-900 dark:bg-gray-50"></div>
                  )}
                {data.production_countries &&
                  Boolean(data.production_countries.length) &&
                  data.production_countries.map(
                    (el: { iso_3166_1: string }, index: number) => (
                      <div key={index} className="font-semibold">
                        {el.iso_3166_1}
                      </div>
                    )
                  )}
                {data.production_countries &&
                  Boolean(data.production_countries.length) &&
                  ((data.number_of_seasons && data.number_of_episodes) ||
                    data.vote_count > 0) && (
                    <div className="h-[2rem] w-[1px] bg-gray-900 dark:bg-gray-50"></div>
                  )}
                {data.number_of_seasons && data.number_of_episodes > 0 && (
                  <div>
                    <span className="font-semibold">
                      {data.number_of_seasons} season
                      {checkPlural(data.number_of_seasons)}{' '}
                    </span>
                    <span className="text-gray-600 dark:text-gray-400">
                      ({data.number_of_episodes} episode
                      {checkPlural(data.number_of_episodes)})
                    </span>
                  </div>
                )}
                {data.number_of_seasons &&
                  data.number_of_episodes > 0 &&
                  data.vote_count > 0 && (
                    <div className="h-[2rem] w-[1px] bg-gray-900 dark:bg-gray-50"></div>
                  )}
                {data.vote_count > 0 && (
                  <div className="h-[40px] w-[40px] cursor-pointer">
                    <div className="peer">
                      <Rating vote={data.vote_average} />
                    </div>
                    <span className="pointer-events-none relative right-[270%] bottom-[215%] mx-auto flex w-max justify-center rounded-2xl bg-gray-300 p-2 opacity-0 shadow shadow-black transition-opacity duration-300 peer-hover:opacity-100 dark:bg-gray-800 min-[1500px]:right-0">
                      User Ratings: {data.vote_count}
                    </span>
                  </div>
                )}
              </div>
              {((data.created_by && Boolean(data.created_by.length)) ||
                (crewCredits && Boolean(crewCredits.length))) && (
                <div className="flex flex-wrap gap-4">
                  {data.created_by && Boolean(data.created_by.length) && (
                    <>
                      {data.created_by.map(
                        (
                          el: {
                            id: number;
                            name: string;
                          },
                          index: number
                        ) => (
                          <Link
                            className="rounded-2xl bg-gray-300 p-4 transition-colors hover:bg-gray-400 dark:bg-gray-800 dark:hover:bg-gray-900"
                            key={index}
                            href={{
                              pathname: `/person/${el.id}`,
                              query: `${toUrl(el.name)}`,
                            }}
                          >
                            {el.name && (
                              <>
                                <div className="font-bold">{el.name}</div>
                                <div className="text-gray-600 dark:text-gray-400">
                                  Creator
                                </div>
                              </>
                            )}
                          </Link>
                        )
                      )}
                    </>
                  )}
                  {crewCredits && Boolean(crewCredits.length) && (
                    <>
                      {crewCredits.map(
                        (
                          el: {
                            id: number;
                            name: string;
                            job: string;
                          },
                          index: number
                        ) => (
                          <Link
                            className="rounded-2xl bg-gray-300 p-4 transition-colors hover:bg-gray-400 dark:bg-gray-800 dark:hover:bg-gray-900"
                            key={index}
                            href={{
                              pathname: `/person/${el.id}`,
                              query: `${toUrl(el.name)}`,
                            }}
                          >
                            {el.name && (
                              <>
                                <div className="font-bold">{el.name}</div>
                                {el.job && (
                                  <div className="text-gray-600 dark:text-gray-400">
                                    {el.job}
                                  </div>
                                )}
                              </>
                            )}
                          </Link>
                        )
                      )}
                    </>
                  )}
                </div>
              )}
              {((data.keywords.keywords &&
                Boolean(data.keywords.keywords.length)) ||
                (data.keywords.results &&
                  Boolean(data.keywords.results.length))) && (
                <div className="flex flex-wrap gap-2">
                  {data.keywords[Object.keys(data.keywords)[0]].map(
                    (el: { id: number; name: string }) => (
                      <div
                        className="rounded-2xl border-4 border-gray-300 px-2 py-1 dark:border-gray-800"
                        key={el.id}
                      >
                        {el.name}
                      </div>
                    )
                  )}
                </div>
              )}
            </div>
          )}
        </div>
        {data.credits.cast && Boolean(data.credits.cast.length) && (
          <>
            <div className="col-span-2 px-2 text-2xl font-bold">Cast:</div>
            <Carousel>
              {data.credits.cast.map(
                (el: {
                  id: number;
                  name: string;
                  profile_path: string;
                  character: string;
                }) => (
                  <div key={el.id} className={styles.slide}>
                    <Link
                      href={{
                        pathname: `/person/${el.id}`,
                        query: `${toUrl(el.name)}`,
                      }}
                    >
                      <CustomImage
                        className="rounded-2xl"
                        width={342}
                        height={513}
                        src={`https://image.tmdb.org/t/p/w342${el.profile_path}`}
                        fallbackSrc={questionTall}
                      />
                      {el.name && (
                        <>
                          <div className="font-bold">{el.name}</div>
                          {el.character && (
                            <div className="text-gray-600 dark:text-gray-400">
                              {el.character}
                            </div>
                          )}
                        </>
                      )}
                    </Link>
                  </div>
                )
              )}
            </Carousel>
          </>
        )}
        {data.recommendations.results &&
          Boolean(data.recommendations.results.length) && (
            <>
              <div className="col-span-2 px-2 text-2xl font-bold">
                Recommendations:
              </div>
              <Carousel>
                {data.recommendations.results.map(
                  (el: {
                    id: number;
                    title: string;
                    poster_path: string;
                    name: string;
                  }) => (
                    <div key={el.id} className={styles.slide}>
                      <Link
                        href={{
                          pathname: `/${type}/${el.id}`,
                          query: `${toUrl(el.title || el.name)}`,
                        }}
                      >
                        <CustomImage
                          className="rounded-2xl"
                          width={342}
                          height={513}
                          src={`https://image.tmdb.org/t/p/w342${el.poster_path}`}
                          fallbackSrc={questionTall}
                        />
                      </Link>
                    </div>
                  )
                )}
              </Carousel>
            </>
          )}
        {data.similar.results && Boolean(data.similar.results.length) && (
          <>
            <div className="col-span-2 flex gap-2 px-2">
              <div className="flex-grow text-2xl font-bold">Similar:</div>
              <div className="group h-[40px] w-[40px] cursor-pointer rounded-2xl bg-gray-200 transition-colors dark:bg-gray-700">
                <svg
                  className="fill-gray-900 dark:fill-gray-50"
                  width="40"
                  height="40"
                >
                  <rect width="3" height="3" x="19" y="29" rx="1.5" />
                  <path d="M21 27.808h-1a1 1 0 0 1-1-1v-3.675a.44.44 0 0 1 .074-.244c1.931-2.897 5.653-5.474 5.01-8.897C23.446 10.59 18.766 8.392 16 16h-2.364a.138.138 0 0 1-.135-.14c.134-9.584 14.03-10.66 13.187-.514-.264 3.163-2.345 5.811-4.59 8.055a.338.338 0 0 0-.098.239v3.168a1 1 0 0 1-1 1Z" />
                </svg>
                <span className="pointer-events-none relative right-[650%] bottom-[130%] mx-auto flex w-max justify-center rounded-2xl bg-gray-200 p-2 opacity-0 shadow shadow-black transition-opacity duration-300 group-hover:opacity-100 dark:bg-gray-800">
                  This list is assembled by looking <br />
                  at keywords and genres.
                </span>
              </div>
            </div>
            <Carousel>
              {data.similar.results.map(
                (el: {
                  id: number;
                  title: string;
                  poster_path: string;
                  name: string;
                }) => (
                  <div key={el.id} className={styles.slide}>
                    <Link
                      href={{
                        pathname: `/${type}/${el.id}`,
                        query: `${toUrl(el.title || el.name)}`,
                      }}
                    >
                      <CustomImage
                        className="rounded-2xl"
                        width={342}
                        height={513}
                        src={`https://image.tmdb.org/t/p/w342${el.poster_path}`}
                        fallbackSrc={questionTall}
                      />
                    </Link>
                  </div>
                )
              )}
            </Carousel>
          </>
        )}
      </div>
    </>
  );
}
