import { Dispatch, SetStateAction, useEffect } from 'react';
import useSWR from 'swr';
import Image from 'next/image';
import Link from 'next/link';

export default function GetNewMoviesPage({
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
  if (isLoading) return <div>Loading...</div>;

  return (
    <>
      {data.results.map(
        (el: { id: number; title: string; poster_path: string }) => (
          <div key={el.id}>
            <Link
              href={{
                pathname: `/movies/${el.id}`,
                query: { title: el.title },
              }}
            >
              <Image
                width={342}
                height={513}
                src={`https://image.tmdb.org/t/p/w342${el.poster_path}`}
                alt=""
              />
            </Link>
          </div>
        )
      )}
    </>
  );
}
