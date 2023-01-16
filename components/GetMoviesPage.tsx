import { Dispatch, SetStateAction, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import useSWR from 'swr';
import { toUrl } from './utils';

export default function GetMoviesPage({
  page,
  inView,
  setPage,
}: {
  page: number;
  inView: boolean;
  setPage: Dispatch<SetStateAction<number>>;
}) {
  const fetcher = (url: RequestInfo | URL) =>
    fetch(url).then((res) => res.json());
  const { data, error, isLoading } = useSWR(
    `/api/movies?page=${page}`,
    fetcher
  );

  useEffect(() => {
    if (inView && !isLoading && !error) {
      setPage(page + 1);
    }
  });

  if (error) return <div>Failed to load</div>;
  if (isLoading)
    return (
      <>
        {Array(20)
          .fill(true)
          .map((_, i) => (
            <div key={i}>
              <Image
                src={
                  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAIAAAADCAYAAAC56t6BAAAAEklEQVR42mNMX/OkngEIGDEYAHIAB2ZYiQm7AAAAAElFTkSuQmCC'
                }
                height={513}
                width={342}
                alt=""
              />
            </div>
          ))}
      </>
    );

  return (
    <>
      {data.results.map(
        (el: { id: number; title: string; poster_path: string }) => (
          <div key={el.id}>
            <Link
              href={{
                pathname: `/movies/${el.id}`,
                query: `${toUrl(el.title)}`,
              }}
            >
              <Image
                className="rounded-2xl"
                width={342}
                height={513}
                src={`https://image.tmdb.org/t/p/w342${el.poster_path}`}
                alt=""
                placeholder="blur"
                blurDataURL={
                  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAIAAAADCAYAAAC56t6BAAAAEklEQVR42mNMX/OkngEIGDEYAHIAB2ZYiQm7AAAAAElFTkSuQmCC'
                }
              />
            </Link>
          </div>
        )
      )}
    </>
  );
}
