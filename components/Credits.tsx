import styles from '../styles/scrollbar-y.module.css';
import Link from 'next/link';
import { toUrl, getDate } from './utils';
import CustomImage from './CustomImage';
import question from '../public/question.svg';

export default function Credits(props: any) {
  const { data } = props;

  const checkType = (el: string) => {
    return el === 'movie' ? 'movie' : 'tv';
  };

  const checkPlural = (el: number) => {
    return el === 1 ? 'episode' : 'episodes';
  };

  if (!data) return null;
  return (
    <div
      className={`${styles.scrollbar} grid max-h-[486px] gap-2 overflow-y-auto`}
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
          },
          index: number
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
                  <div className="font-bold">{el.title || el.name}</div>
                )}
                <div className="text-gray-600 dark:text-gray-400">
                  {el.character || el.job}
                </div>
                <div className="text-gray-600 dark:text-gray-400">
                  {el.media_type}{' '}
                  {el.episode_count && (
                    <span>
                      ({el.episode_count} {checkPlural(el.episode_count)})
                    </span>
                  )}
                </div>
                {(el.release_date || el.first_air_date) && (
                  <div>{getDate(el.release_date || el.first_air_date)}</div>
                )}
              </div>
            </Link>
          </div>
        )
      )}
    </div>
  );
}
