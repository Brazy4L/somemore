import styles from '../styles/scrollbar-y.module.css';
import Link from 'next/link';
import { toUrl, getDate, checkPlural } from './utils';
import CustomImage from './CustomImage';
import questionTall from '../public/question-tall.svg';
import Rating from './Rating';

export default function Credits(props: any) {
  const { data } = props;

  const checkType = (el: string) => {
    return el === 'movie' ? 'movie' : 'tv';
  };

  if (!data) return null;
  return (
    <div
      className={`${styles.scrollbar} grid max-h-[480px] gap-2 overflow-y-auto overflow-x-clip`}
    >
      {data.map(
        (
          el: {
            id: number;
            poster_path: string;
            release_date: string;
            title: string;
            character: string;
            job: string;
            media_type: string;
            name: string;
            first_air_date: string;
            episode_count: number;
            vote_average: number;
            vote_count: number;
          },
          index: number
        ) => (
          <div
            className="rounded-2xl bg-gray-300 p-2 transition-colors hover:bg-gray-400 dark:bg-gray-700 dark:hover:bg-gray-800"
            key={index}
          >
            <Link
              className="flex gap-4"
              href={{
                pathname: `/${checkType(el.media_type)}/${el.id}`,
                query: `${toUrl(el.title || el.name)}`,
              }}
            >
              <div className="flex-shrink-0">
                <CustomImage
                  className="rounded-2xl"
                  width={64}
                  height={96}
                  src={`https://image.tmdb.org/t/p/w92${el.poster_path}`}
                  fallbackSrc={questionTall}
                />
              </div>
              <div className="flex flex-grow flex-col justify-center">
                {(el.title || el.name) && (
                  <div className="font-bold">{el.title || el.name}</div>
                )}
                <div className="text-gray-600 dark:text-gray-400">
                  {el.character || el.job}
                </div>
                <div className="text-gray-600 dark:text-gray-400">
                  {el.media_type}{' '}
                  {el.episode_count && (
                    <span>
                      ({el.episode_count} episode{checkPlural(el.episode_count)}
                      )
                    </span>
                  )}
                </div>
                {(el.release_date || el.first_air_date) && (
                  <div>{getDate(el.release_date || el.first_air_date)}</div>
                )}
              </div>
              {el.vote_count > 0 && (
                <div className="h-[40px] w-[40px] flex-shrink-0 self-center">
                  <div className="peer">
                    <Rating vote={el.vote_average} />
                  </div>
                  <span className="pointer-events-none relative bottom-[100%] right-[420%] mx-auto flex w-max justify-center rounded-2xl bg-gray-400 p-2 opacity-0 shadow shadow-black transition-opacity duration-300 peer-hover:opacity-100 dark:bg-gray-800">
                    User Ratings: {el.vote_count}
                  </span>
                </div>
              )}
            </Link>
          </div>
        )
      )}
    </div>
  );
}
