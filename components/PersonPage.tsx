import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Head from 'next/head';
import useSWR from 'swr';
import { toUrl, getDate } from './utils';
import CustomImage from './CustomImage';
import question from '../public/question.svg';

export default function PersonPage() {
  const { query } = useRouter();
  const [castCredits, setCastCredits] = useState<Array<any>>([]);
  const [crewCredits, setCrewCredits] = useState<Array<any>>([]);
  const fetcher = (url: RequestInfo | URL) =>
    fetch(url).then((res) => res.json());
  const { data, error, isLoading } = useSWR(
    `/api/person?idperson=${query.id}`,
    fetcher,
    {
      onSuccess: (data, key, config) => {
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
        const sortedDefinedCastCredits = definedCastCredits.sort((a, b) => {
          return (
            +new Date(b.release_date || b.first_air_date) -
            +new Date(a.release_date || a.first_air_date)
          );
        });
        setCastCredits(sortedDefinedCastCredits.concat(undefinedCastCredits));

        let undefinedCrewCredits: Array<any> = [];
        let definedCrewCredits: Array<any> = [];
        data.combined_credits.crew.filter(function (el: {
          release_date: string;
          first_air_date: string;
        }) {
          el.release_date || el.first_air_date
            ? definedCrewCredits.push(el)
            : undefinedCrewCredits.push(el);
        });
        const sortedDefinedCrewCredits = definedCrewCredits.sort((a, b) => {
          return (
            +new Date(b.release_date || b.first_air_date) -
            +new Date(a.release_date || a.first_air_date)
          );
        });
        setCrewCredits(sortedDefinedCrewCredits.concat(undefinedCrewCredits));
      },
    }
  );

  if (error) return <div>Failed to load</div>;
  if (isLoading) return <div>Loading...</div>;

  const checkGender = (el: number) => {
    return el === 1 ? 'Actress:' : el === 2 ? 'Actor:' : 'Credits:';
  };

  const checkType = (el: string) => {
    return el === 'movie' ? 'movie' : 'tv';
  };

  const checkPlural = (el: number) => {
    return el === 1 ? 'episode' : 'episodes';
  };

  return (
    <>
      <Head>
        <title>{data.name} | SOMEMORE</title>
      </Head>
      <div className="mx-auto box-content grid max-w-[1280px] gap-8 pb-8 min-[820px]:grid-cols-[minmax(342px,1fr)_10fr]">
        <div className="flex flex-col items-center gap-4 min-[820px]:items-start">
          <CustomImage
            className="rounded-2xl"
            width={342}
            height={513}
            src={`https://image.tmdb.org/t/p/w342${data.profile_path}`}
            fallbackSrc={question}
          />
          <div className="px-2 text-3xl font-bold">{data.name}</div>
          <div className="flex flex-wrap gap-4 px-2">
            {data.imdb_id && (
              <Link
                className="h-min cursor-pointer rounded-full bg-gray-300 p-2 transition-colors hover:bg-gray-400 dark:bg-gray-700 dark:hover:bg-gray-800"
                href={`https://www.imdb.com/name/${data.imdb_id}/`}
                target="_blank"
                rel="noopener"
              >
                IMDb
              </Link>
            )}
            {data.external_ids.twitter_id && (
              <Link
                className="h-min cursor-pointer rounded-full bg-gray-300 p-2 transition-colors hover:bg-gray-400 dark:bg-gray-700 dark:hover:bg-gray-800"
                href={`https://twitter.com/${data.external_ids.twitter_id}`}
                target="_blank"
                rel="noopener"
              >
                Twitter
              </Link>
            )}
            {data.external_ids.instagram_id && (
              <Link
                className="h-min cursor-pointer rounded-full bg-gray-300 p-2 transition-colors hover:bg-gray-400 dark:bg-gray-700 dark:hover:bg-gray-800"
                href={`https://instagram.com/${data.external_ids.instagram_id}/`}
                target="_blank"
                rel="noopener"
              >
                Instagram
              </Link>
            )}
            {data.external_ids.facebook_id && (
              <Link
                className="h-min cursor-pointer rounded-full bg-gray-300 p-2 transition-colors hover:bg-gray-400 dark:bg-gray-700 dark:hover:bg-gray-800"
                href={`https://www.facebook.com/${data.external_ids.facebook_id}/`}
                target="_blank"
                rel="noopener"
              >
                Facebook
              </Link>
            )}
            {data.name && (
              <Link
                className="h-min cursor-pointer rounded-full bg-gray-300 p-2 transition-colors hover:bg-gray-400 dark:bg-gray-700 dark:hover:bg-gray-800"
                href={`https://www.google.com/search?q=${data.name}`}
                target="_blank"
                rel="noopener"
              >
                Google
              </Link>
            )}
          </div>
          <div className="mx-2 rounded-2xl bg-gray-300 p-2 transition-colors dark:bg-gray-700">
            {data.biography}
          </div>
        </div>
        <div className="px-2">
          {castCredits && Boolean(castCredits.length) && (
            <>
              <div className="py-2 text-2xl font-bold">
                {checkGender(data.gender)}
              </div>
              <div className="grid gap-2">
                {castCredits.map(
                  (
                    el: {
                      id: number;
                      poster_path: string;
                      release_date: string;
                      title: string;
                      character: string;
                      media_type: string;
                      name: string;
                      first_air_date: string;
                      episode_count: number;
                    },
                    index
                  ) => (
                    <div
                      className="rounded-2xl bg-gray-300 p-2 transition-colors hover:bg-gray-400 dark:bg-gray-700 dark:hover:bg-gray-800"
                      key={index}
                    >
                      <Link
                        className="flex"
                        href={{
                          pathname: `/${checkType(el.media_type)}/${el.id}`,
                          query: `${toUrl(el.title || el.name)}`,
                        }}
                      >
                        <div className="flex flex-shrink-0 items-center">
                          <CustomImage
                            className="rounded-2xl"
                            width={92}
                            height={138}
                            src={`https://image.tmdb.org/t/p/w92${el.poster_path}`}
                            fallbackSrc={question}
                          />
                        </div>
                        <div className="flex flex-col justify-center pl-4">
                          {(el.title || el.name) && (
                            <div className="font-bold">
                              {el.title || el.name}
                            </div>
                          )}
                          <div className="text-gray-600 dark:text-gray-400">
                            {el.character}
                          </div>
                          <div className="text-gray-600 dark:text-gray-400">
                            {el.media_type}{' '}
                            {el.episode_count && (
                              <span>
                                ({el.episode_count}{' '}
                                {checkPlural(el.episode_count)})
                              </span>
                            )}
                          </div>
                          {(el.release_date || el.first_air_date) && (
                            <div>
                              {getDate(el.release_date || el.first_air_date)}
                            </div>
                          )}
                        </div>
                      </Link>
                    </div>
                  )
                )}
              </div>
            </>
          )}
          {crewCredits && Boolean(crewCredits.length) && (
            <>
              <div className="py-2 text-2xl font-bold">Filmmaking:</div>
              <div className="grid gap-2">
                {crewCredits.map(
                  (
                    el: {
                      id: number;
                      poster_path: string;
                      release_date: string;
                      title: string;
                      job: string;
                      media_type: string;
                      name: string;
                      first_air_date: string;
                      episode_count: number;
                    },
                    index
                  ) => (
                    <div
                      className="rounded-2xl bg-gray-300 p-2 transition-colors hover:bg-gray-400 dark:bg-gray-700 dark:hover:bg-gray-800"
                      key={index}
                    >
                      <Link
                        className="flex"
                        href={{
                          pathname: `/${checkType(el.media_type)}/${el.id}`,
                          query: `${toUrl(el.title || el.name)}`,
                        }}
                      >
                        <div className="flex flex-shrink-0 items-center">
                          <CustomImage
                            className="rounded-2xl"
                            width={92}
                            height={138}
                            src={`https://image.tmdb.org/t/p/w92${el.poster_path}`}
                            fallbackSrc={question}
                          />
                        </div>
                        <div className="flex flex-col justify-center pl-4">
                          {(el.title || el.name) && (
                            <div className="font-bold">
                              {el.title || el.name}
                            </div>
                          )}
                          <div className="text-gray-600 dark:text-gray-400">
                            {el.job}
                          </div>
                          <div className="text-gray-600 dark:text-gray-400">
                            {el.media_type}{' '}
                            {el.episode_count && (
                              <span>
                                ({el.episode_count}{' '}
                                {checkPlural(el.episode_count)})
                              </span>
                            )}
                          </div>
                          {(el.release_date || el.first_air_date) && (
                            <div>
                              {getDate(el.release_date || el.first_air_date)}
                            </div>
                          )}
                        </div>
                      </Link>
                    </div>
                  )
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}
