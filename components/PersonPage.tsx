import styles from '../styles/gallery.module.css';
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Head from 'next/head';
import useSWR from 'swr';
import CustomImage from './CustomImage';
import questionTall from '../public/question-tall.svg';
import Gallery from './Gallery';
import Credits from './Credits';
import Spinner from './Spinner';
import LoadingError from './LoadingError';

export default function PersonPage() {
  const { query } = useRouter();
  const [castCredits, setCastCredits] = useState<Array<any>>([]);
  const [crewCredits, setCrewCredits] = useState<Array<any>>([]);
  const [hidden, setHidden] = useState(true);
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

  if (error) return <LoadingError />;
  if (isLoading) return <Spinner />;

  const checkGender = (el: number) => {
    return el === 1 ? 'Actress:' : el === 2 ? 'Actor:' : 'Credits:';
  };

  return (
    <>
      <Head>
        <title>{data.name} | SOMEMORE</title>
      </Head>
      <div className="mx-auto box-content grid max-w-[1280px] gap-8 pb-8 min-[820px]:grid-cols-[minmax(342px,1fr)_10fr]">
        <div className="flex flex-col items-center gap-4 min-[820px]:items-start">
          <CustomImage
            className="aspect-[2/3] w-full max-w-[342px] cursor-pointer rounded-2xl"
            width={342}
            height={513}
            src={`https://image.tmdb.org/t/p/w342${data.profile_path}`}
            fallbackSrc={questionTall}
            onClick={() => {
              setHidden(false);
            }}
          />
          <div className="fixed top-[60px] left-0 z-10 bg-[#ffffff] dark:bg-[#101010]">
            <Gallery hidden={hidden} data={data.images.profiles} />
          </div>
          {!hidden && (
            <>
              <div className="fixed top-0 left-0 h-screen w-screen bg-[#000000c0]"></div>
              <button
                className={`${styles.galleryButton} fixed left-[50%] z-10 w-[200px] -translate-x-1/2 rounded-2xl bg-gray-200 p-4 transition-colors hover:bg-gray-300 dark:bg-gray-800 dark:hover:bg-gray-900`}
                onClick={() => {
                  setHidden(true);
                }}
              >
                Close
              </button>
            </>
          )}
          <div className="px-2 text-3xl font-bold">{data.name}</div>
          <div className="flex flex-wrap gap-4 px-2">
            {data.imdb_id && (
              <Link
                className="h-min cursor-pointer rounded-2xl bg-gray-200 p-2 transition-colors hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-800"
                href={`https://www.imdb.com/name/${data.imdb_id}/`}
                target="_blank"
                rel="noopener"
              >
                IMDb
              </Link>
            )}
            {data.external_ids.twitter_id && (
              <Link
                className="h-min cursor-pointer rounded-2xl bg-gray-200 p-2 transition-colors hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-800"
                href={`https://twitter.com/${data.external_ids.twitter_id}`}
                target="_blank"
                rel="noopener"
              >
                Twitter
              </Link>
            )}
            {data.external_ids.instagram_id && (
              <Link
                className="h-min cursor-pointer rounded-2xl bg-gray-200 p-2 transition-colors hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-800"
                href={`https://instagram.com/${data.external_ids.instagram_id}/`}
                target="_blank"
                rel="noopener"
              >
                Instagram
              </Link>
            )}
            {data.external_ids.facebook_id && (
              <Link
                className="h-min cursor-pointer rounded-2xl bg-gray-200 p-2 transition-colors hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-800"
                href={`https://www.facebook.com/${data.external_ids.facebook_id}/`}
                target="_blank"
                rel="noopener"
              >
                Facebook
              </Link>
            )}
            {data.name && (
              <Link
                className="h-min cursor-pointer rounded-2xl bg-gray-200 p-2 transition-colors hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-800"
                href={`https://www.google.com/search?q=${data.name}`}
                target="_blank"
                rel="noopener"
              >
                Google
              </Link>
            )}
          </div>
          {data.biography && (
            <div className="mx-2 rounded-2xl bg-gray-200 p-2 transition-colors dark:bg-gray-700">
              {data.biography}
            </div>
          )}
        </div>
        <div className="px-2">
          {castCredits && Boolean(castCredits.length) && (
            <>
              <div className="pb-2 text-2xl font-bold">
                {checkGender(data.gender)}
              </div>
              <Credits data={castCredits} />
            </>
          )}
          {crewCredits && Boolean(crewCredits.length) && (
            <>
              <div className="py-2 text-2xl font-bold">Filmmaking:</div>
              <Credits data={crewCredits} />
            </>
          )}
        </div>
      </div>
    </>
  );
}
