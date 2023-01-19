import styles from '../styles/scrollbar-x.module.css';
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Head from 'next/head';
import useSWR from 'swr';
import { toUrl, getDate } from './utils';
import Trailer from './Trailer';
import CustomImage from './CustomImage';
import question from '../public/question.svg';
import questionWide from '../public/question-wide.svg';
import Spinner from './Spinner';
import LoadingError from './LoadingError';
import { createVerify } from 'crypto';

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
            className="min-[540px]:brightness-[0.5]"
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
            fallbackSrc={question}
          />
        </div>
        <div className="z-10 col-span-2 col-start-1 row-start-3 px-2 py-2 text-xl font-bold text-gray-50 [text-shadow:_0px_1px_10px_rgb(0_0_0_/_100%)] min-[540px]:row-start-2 min-[540px]:px-3 min-[540px]:py-0 min-[540px]:text-2xl min-[1000px]:px-12 min-[1300px]:text-4xl">
          {data.title || data.name}
        </div>
        <div className="z-10 col-span-2 col-start-1 flex flex-wrap justify-between gap-2 px-2 min-[540px]:row-start-3 min-[540px]:px-3 min-[540px]:text-gray-50 min-[1000px]:px-12">
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
        <div className="z-10 col-span-2 aspect-video self-center min-[540px]:col-span-1 min-[540px]:col-start-2 min-[540px]:row-start-1 min-[540px]:mr-8 min-[1000px]:mr-32">
          {trailer && <Trailer trailerKey={trailer.key} />}
        </div>
        {data.genres && Boolean(data.genres.length) && (
          <div
            className={`${styles.scrollbar} col-span-2 mx-2 flex gap-2 overflow-y-auto`}
          >
            {data.genres.map((el: { id: number; name: string }) => (
              <div
                className="min-w-fit cursor-pointer rounded-2xl bg-gray-300 p-2 hover:bg-gray-400 dark:bg-gray-700 dark:hover:bg-gray-800"
                key={el.id}
              >
                {el.name}
              </div>
            ))}
          </div>
        )}
        <div className="col-span-2 px-2">{data.overview}</div>
        {data.keywords.keywords && Boolean(data.keywords.keywords.length) && (
          <div
            className={`${styles.scrollbar} col-span-2 mx-2 flex gap-2 overflow-y-auto`}
          >
            {data.keywords.keywords.map((el: { id: number; name: string }) => (
              <div
                className="min-w-fit cursor-pointer rounded-2xl bg-gray-300 p-2 hover:bg-gray-400 dark:bg-gray-700 dark:hover:bg-gray-800"
                key={el.id}
              >
                {el.name}
              </div>
            ))}
          </div>
        )}
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
                    className="min-w-[65%] min-[340px]:min-w-[60%] min-[420px]:min-w-[55%] min-[500px]:min-w-[45%] min-[600px]:min-w-[35%] min-[750px]:min-w-[25%] min-[1050px]:min-w-[18.9%]"
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
                        fallbackSrc={question}
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
        {crewCredits && Boolean(crewCredits.length) && (
          <>
            <div className="col-span-2 px-2 text-2xl font-bold">Crew:</div>
            <div className="col-span-2 flex flex-wrap justify-between gap-4 px-2">
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
                    className="rounded-2xl bg-gray-300 p-4 transition-colors hover:bg-gray-400 dark:bg-gray-700 dark:hover:bg-gray-800"
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
                      className="min-w-[65%] min-[340px]:min-w-[60%] min-[420px]:min-w-[55%] min-[500px]:min-w-[45%] min-[600px]:min-w-[35%] min-[750px]:min-w-[25%] min-[1050px]:min-w-[18.9%]"
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
                          fallbackSrc={question}
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
                    className="min-w-[65%] min-[340px]:min-w-[60%] min-[420px]:min-w-[55%] min-[500px]:min-w-[45%] min-[600px]:min-w-[35%] min-[750px]:min-w-[25%] min-[1050px]:min-w-[18.9%]"
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
                        fallbackSrc={question}
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
