import Link from 'next/link';
import CustomImage from './CustomImage';
import questionTall from '../public/question-tall.svg';
import { toUrl, getDate } from './utils';
import { useEffect, useState } from 'react';

export default function WatchlistPage() {
  const [data, setData] = useState<Array<any>>([]);
  useEffect(() => {
    setData(JSON.parse(localStorage.getItem('watchlist') || '[]'));
  }, []);

  const checkType = (el: string) => {
    return el === 'movie' ? 'movie' : 'tv';
  };

  if (!data || Boolean(!data.length))
    return (
      <div className="flex h-[calc(100vh-60px)] items-center justify-center text-center">
        Nothing to watch in this list.
      </div>
    );
  return (
    <>
      <div className="mx-auto box-content grid max-w-[1280px] gap-2 px-2 pb-8 min-[1150px]:grid-cols-2">
        {data.map((el, index) => (
          <Link
            className="flex gap-4 rounded-2xl bg-gray-200 p-2 transition-colors hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-800"
            key={index}
            href={{
              pathname: `/${checkType(el.type)}/${el.id}`,
              query: `${toUrl(el.title)}`,
            }}
          >
            <div className="flex-shrink-0">
              <CustomImage
                className="rounded-2xl"
                width={64}
                height={96}
                src={`https://image.tmdb.org/t/p/w92${el.poster}`}
                fallbackSrc={questionTall}
              />
            </div>
            <div className="flex flex-grow flex-col justify-center">
              {el.title && <div className="font-bold">{el.title}</div>}
              {el.type && (
                <div className="text-gray-600 dark:text-gray-400">
                  {el.type}
                </div>
              )}
              {el.release && <div>{getDate(el.release)}</div>}
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}
