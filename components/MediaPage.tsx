import styles from '../styles/scrollbar-x.module.css';
import { useState } from 'react';
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

interface trailer {
  key: string;
}

export default function MediaPage({ type }: { type: string }) {
  const { query } = useRouter();
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
            className="min-[540px]:rounded-2xl min-[540px]:brightness-[0.5]"
            width={1280}
            height={720}
            src={`https://image.tmdb.org/t/p/w1280${data.backdrop_path}`}
            fallbackSrc={questionWide}
          />
        </div>
        <div className="z-10 col-start-1 row-start-1 hidden self-center min-[540px]:ml-3 min-[540px]:block min-[1000px]:ml-12">
          <CustomImage
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
            <div className="flex flex-col gap-4 rounded-2xl bg-gray-300 p-2 dark:bg-gray-700">
              <button className="rounded-2xl bg-gray-400 p-2 transition-colors hover:bg-gray-500 dark:bg-gray-800 dark:hover:bg-gray-900">
                <div className="font-bold">Add to Watchlist</div>
                <div className="text-gray-600 dark:text-gray-400">
                  Added by {Math.round(data.popularity)} users
                </div>
              </button>
              {data.genres && Boolean(data.genres.length) && (
                <div className="flex flex-wrap gap-2">
                  {data.genres.map((el: { id: number; name: string }) => (
                    <div
                      className="cursor-pointer rounded-2xl bg-gray-400 p-2 transition-colors hover:bg-gray-500 dark:bg-gray-800 dark:hover:bg-gray-900"
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
            <div className="flex flex-col gap-4 rounded-2xl bg-gray-300 p-2 dark:bg-gray-700">
              <div className="flex flex-wrap items-center justify-center gap-2 rounded-2xl p-2">
                {(data.status || data.in_production) && (
                  <div className="font-semibold">
                    {data.status || checkProduction(data.in_production)}
                  </div>
                )}
                {data.status &&
                  (data.production_countries ||
                    (data.number_of_seasons && data.number_of_episodes) ||
                    data.vote_count > 0) && (
                    <div className="h-[2rem] w-[1px] bg-gray-900 dark:bg-gray-50"></div>
                  )}
                {data.production_countries &&
                  data.production_countries.map(
                    (el: { iso_3166_1: string }, index: number) => (
                      <div key={index} className="font-semibold">
                        {el.iso_3166_1}
                      </div>
                    )
                  )}
                {data.production_countries &&
                  ((data.number_of_seasons && data.number_of_episodes) ||
                    data.vote_count > 0) && (
                    <div className="h-[2rem] w-[1px] bg-gray-900 dark:bg-gray-50"></div>
                  )}
                {data.number_of_seasons && data.number_of_episodes && (
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
                  data.number_of_episodes &&
                  data.vote_count > 0 && (
                    <div className="h-[2rem] w-[1px] bg-gray-900 dark:bg-gray-50"></div>
                  )}
                {data.vote_count > 0 && (
                  <div
                    title={`User Ratings: ${data.vote_count}`}
                    className="h-[40px] w-[40px]"
                  >
                    <Rating vote={data.vote_average} />
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
                            className="rounded-2xl bg-gray-400 p-4 transition-colors hover:bg-gray-500 dark:bg-gray-800 dark:hover:bg-gray-900"
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
                            className="rounded-2xl bg-gray-400 p-4 transition-colors hover:bg-gray-500 dark:bg-gray-800 dark:hover:bg-gray-900"
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
                        className="cursor-pointer rounded-2xl bg-gray-400 p-2 transition-colors hover:bg-gray-500 dark:bg-gray-800 dark:hover:bg-gray-900"
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
            <div
              className={`${styles.scrollbar} col-span-2 mx-2 flex gap-4 overflow-y-auto`}
            >
              {data.credits.cast.map(
                (el: {
                  id: number;
                  name: string;
                  profile_path: string;
                  character: string;
                }) => (
                  <div
                    key={el.id}
                    className="min-w-[65%] max-w-[19%] min-[340px]:min-w-[60%] min-[420px]:min-w-[55%] min-[500px]:min-w-[45%] min-[600px]:min-w-[35%] min-[750px]:min-w-[25%] min-[1050px]:min-w-[18.995%]"
                  >
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
            </div>
          </>
        )}
        {data.recommendations.results &&
          Boolean(data.recommendations.results.length) && (
            <>
              <div className="col-span-2 px-2 text-2xl font-bold">
                Recommendations:
              </div>
              <div
                className={`${styles.scrollbar} col-span-2 mx-2 flex gap-4 overflow-y-auto`}
              >
                {data.recommendations.results.map(
                  (el: {
                    id: number;
                    title: string;
                    poster_path: string;
                    name: string;
                  }) => (
                    <div
                      key={el.id}
                      className="min-w-[65%] max-w-[19%] min-[340px]:min-w-[60%] min-[420px]:min-w-[55%] min-[500px]:min-w-[45%] min-[600px]:min-w-[35%] min-[750px]:min-w-[25%] min-[1050px]:min-w-[18.995%]"
                    >
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
              </div>
            </>
          )}
        {data.similar.results && Boolean(data.similar.results.length) && (
          <>
            <div className="col-span-2 flex gap-2 px-2 text-2xl font-bold">
              <span className="flex-grow">Similar:</span>
              <span
                className="min-w-fit cursor-pointer rounded-2xl bg-gray-300 px-4 transition-colors hover:bg-gray-400 dark:bg-gray-700 dark:hover:bg-gray-800"
                title="This list is assembled by looking at keywords and genres."
              >
                ?
              </span>
            </div>
            <div
              className={`${styles.scrollbar} col-span-2 mx-2 flex gap-4 overflow-y-auto`}
            >
              {data.similar.results.map(
                (el: {
                  id: number;
                  title: string;
                  poster_path: string;
                  name: string;
                }) => (
                  <div
                    key={el.id}
                    className="min-w-[65%] max-w-[19%] min-[340px]:min-w-[60%] min-[420px]:min-w-[55%] min-[500px]:min-w-[45%] min-[600px]:min-w-[35%] min-[750px]:min-w-[25%] min-[1050px]:min-w-[18.995%]"
                  >
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
            </div>
          </>
        )}
      </div>
    </>
  );
}
