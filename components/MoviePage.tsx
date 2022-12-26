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
      <div className="mx-auto box-content max-w-[1280px] px-8 text-slate-50 max-[540px]:px-2">
        <div>
          <Image
            className=""
            width={1280}
            height={720}
            src={`https://image.tmdb.org/t/p/w1280${data.backdrop_path}`}
            alt=""
          />
        </div>
        <div>
          <Image
            width={780}
            height={1170}
            src={`https://image.tmdb.org/t/p/w780${data.poster_path}`}
            alt=""
          />
          <div>
            {data.genres.map((el: { id: number; name: string }) => (
              <div key={el.id}>{el.name}</div>
            ))}
          </div>
          <div>
            <div>{data.title}</div>
            <div>{getDate(data.release_date)}</div>
          </div>
          <div>{data.overview}</div>
          <div>
            <Link href={`https://www.imdb.com/title/${data.imdb_id}/`}>
              IMDb
            </Link>
          </div>
          <div>
            {data.keywords.keywords.map((el: { id: number; name: string }) => (
              <div key={el.id}>{el.name}</div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
