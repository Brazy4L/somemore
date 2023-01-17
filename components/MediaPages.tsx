import { useState, useEffect } from 'react';
import Link from 'next/link';
import useSWR from 'swr';
import { useInView } from 'react-intersection-observer';
import GetMediaPages from './GetMediaPages';

export default function MediaPages({ type }: { type: string }) {
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState<Array<any>>([]);
  const [ref, inView] = useInView({
    rootMargin: '2160px',
  });
  const fetcher = (url: RequestInfo | URL) =>
    fetch(url).then((res) => res.json());
  const { data, error, isLoading } = useSWR(
    `/api/media?type=${type}&page=${page}`,
    fetcher
  );

  useEffect(() => {
    if (inView && !isLoading && !error) {
      setPage(page + 1);
      setPages((arr) => [
        ...arr,
        <GetMediaPages key={page} data={data} type={type} />,
      ]);
    }
  }, [data, error, inView, isLoading, page, type]);

  return (
    <>
      <div className="mx-auto box-content grid max-w-[1280px] grid-cols-3 justify-center gap-2 px-2 min-[540px]:grid-cols-4 min-[540px]:px-8 min-[800px]:grid-cols-5 min-[1050px]:grid-cols-6">
        {pages}
        {isLoading ? (
          <>
            {Array(20)
              .fill(true)
              .map((_, i) => (
                <div
                  key={i}
                  className="aspect-[2/3] w-[342px] max-w-full bg-[#202020]"
                ></div>
              ))}
          </>
        ) : null}
      </div>
      {error ? (
        <div className="grid h-[calc(100vh-60px)] items-center justify-items-center">
          <div className="-translate-y-1/2 text-center">
            <div className="font-bold">ERROR</div>
            <div>
              Looks like you couldn&apos;t reach{' '}
              <Link
                className="cursor-pointer underline"
                href="https://www.themoviedb.org/"
                target="_blank"
                rel="noopener"
              >
                TMDB
              </Link>
            </div>
            <div>Check your connection</div>
          </div>
        </div>
      ) : null}
      <div ref={ref}>{inView}</div>
    </>
  );
}
