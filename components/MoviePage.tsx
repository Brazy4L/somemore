import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import Head from 'next/head';

export default function MoviePage() {
  const { query } = useRouter();
  const fetcher = (url: RequestInfo | URL) =>
    fetch(url).then((res) => res.json());
  const { data, error, isLoading } = useSWR(
    `/api/movie?idmovie=${query.id}`,
    fetcher
  );

  if (error) return <div>Failed to load</div>;
  if (isLoading) return <div>Loading...</div>;

  const getDate = (date: Date) =>
    new Date(date).toLocaleString('en-us', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });

  return (
    <>
      <Head>
        <title>{data.title} | SOMEMORE</title>
      </Head>
      <div className="mx-auto box-content max-w-[1280px] text-slate-50">
        <div className="-z-20 grid grid-cols-1 grid-rows-1 min-[540px]:absolute">
          <Image
            className="-z-20 col-start-1 row-start-1 min-[540px]:brightness-[0.5]"
            width={1280}
            height={720}
            src={`https://image.tmdb.org/t/p/w1280${data.backdrop_path}`}
            alt=""
          />
          <div className="col-start-1 row-start-1 self-end p-2 text-xl font-bold [text-shadow:_0px_1px_6px_rgb(0_0_0_/_100%)] min-[540px]:hidden min-[540px]:text-2xl">
            {data.title}
          </div>
        </div>
        <div className="mt-2 grid gap-4 px-2 min-[540px]:mt-0 min-[540px]:bg-[rgba(4,14,22,0.4)] min-[540px]:px-8 min-[540px]:pt-2">
          <Image
            className="hidden w-1/3 rounded-lg border-[3px] border-gray-700 min-[540px]:block"
            width={780}
            height={1170}
            src={`https://image.tmdb.org/t/p/w780${data.poster_path}`}
            alt=""
          />
          <div className="hidden text-xl font-bold [text-shadow:_0px_1px_6px_rgb(0_0_0_/_100%)] min-[540px]:block min-[540px]:text-2xl">
            {data.title}
          </div>
          <div className="flex flex-wrap justify-between gap-1">
            <div className="text-slate-300 [text-shadow:_0px_1px_6px_rgb(0_0_0_/_100%)]">
              Release Date: {getDate(data.release_date)}
            </div>
            <Link
              className="font-bold"
              href={`https://www.imdb.com/title/${data.imdb_id}/`}
              target="_blank"
              rel="noopener"
            >
              🔗 IMDb
            </Link>
          </div>
          <div className="flex flex-wrap justify-evenly gap-2">
            {data.genres.map((el: { id: number; name: string }) => (
              <div
                className="cursor-pointer rounded-full bg-gray-700 p-2 transition-colors hover:bg-gray-600"
                key={el.id}
              >
                {el.name}
              </div>
            ))}
          </div>
          <div>{data.overview}</div>
          <div className="flex flex-wrap justify-evenly gap-2">
            {data.keywords.keywords.map((el: { id: number; name: string }) => (
              <div
                className="cursor-pointer rounded-full bg-gray-700 p-2 transition-colors hover:bg-gray-600"
                key={el.id}
              >
                {el.name}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
