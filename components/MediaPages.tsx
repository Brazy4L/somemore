import { useEffect } from 'react';
import useSWR from 'swr';
import { useInView } from 'react-intersection-observer';
import RenderMediaPages from './RenderMediaPages';
import LoadingError from './LoadingError';

export default function MediaPages({
  type,
  page,
  setPage,
  pages,
  setPages,
}: {
  type: string;
  page: number;
  setPage: any;
  pages: any;
  setPages: any;
}) {
  const [ref, inView] = useInView({
    rootMargin: '320px',
  });
  const fetcher = (url: RequestInfo | URL) =>
    fetch(url).then((res) => res.json());
  const { data, error, isLoading } = useSWR(
    `/api/popmedia?type=${type}&page=${page}`,
    fetcher,
    {
      onSuccess: (data, key, config) => {
        let i = data.results.length;
        while (i--) {
          if (data.results[i].name && data.results[i].vote_count < 22) {
            data.results.splice(i, 1);
          }
        }
      },
    }
  );

  useEffect(() => {
    if (inView && !isLoading && !error) {
      setPage();
      setPages(<RenderMediaPages key={page} data={data} type={type} />);
    }
  }, [inView, data]);

  if (error) return <LoadingError />;

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
                  className="aspect-[2/3] w-[342px] max-w-full rounded-2xl bg-[#202020]"
                ></div>
              ))}
          </>
        ) : null}
      </div>
      <div ref={ref}>{inView}</div>
    </>
  );
}
