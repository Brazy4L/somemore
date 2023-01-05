import styles from '../styles/MoviePage.module.css';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import Head from 'next/head';
import { toUrl } from './utils';

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

  const trailer = data.videos.results.find((el: { type: string }) => {
    return el.type === 'Trailer';
  });

  return (
    <>
      <Head>
        <title>{data.title} | SOMEMORE</title>
      </Head>
      <div className="mx-auto box-content grid max-w-[1280px] grid-cols-[3fr,8fr] gap-4 pb-8 text-slate-50 min-[540px]:bg-[rgba(4,14,22,0.4)]">
        <div className="-z-20 col-span-2 col-start-1 row-span-3 row-start-1">
          <Image
            className="-z-20 min-[540px]:brightness-[0.5]"
            width={1280}
            height={720}
            src={`https://image.tmdb.org/t/p/w1280${data.backdrop_path}`}
            placeholder="blur"
            blurDataURL={
              'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAIAAAADCAYAAAC56t6BAAAAEklEQVR42mNMX/OkngEIGDEYAHIAB2ZYiQm7AAAAAElFTkSuQmCC'
            }
            alt=""
          />
        </div>
        <div className="col-start-1 row-start-1 hidden self-center min-[540px]:ml-3 min-[540px]:block min-[1000px]:ml-12">
          <Image
            width={780}
            height={1170}
            src={`https://image.tmdb.org/t/p/w780${data.poster_path}`}
            placeholder="blur"
            blurDataURL={
              'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAIAAAADCAYAAAC56t6BAAAAEklEQVR42mNMX/OkngEIGDEYAHIAB2ZYiQm7AAAAAElFTkSuQmCC'
            }
            alt=""
          />
        </div>
        <div className="col-span-2 col-start-1 row-start-3 px-2 py-2 text-xl font-bold [text-shadow:_0px_1px_6px_rgb(0_0_0_/_100%)] min-[540px]:row-start-2 min-[540px]:px-3 min-[540px]:py-0 min-[540px]:text-2xl min-[1000px]:px-12 min-[1300px]:text-4xl">
          {data.title}
        </div>
        <div className="col-span-2 col-start-1 flex flex-wrap justify-between gap-1 px-2 min-[540px]:row-start-3 min-[540px]:px-3 min-[1000px]:px-12">
          <div className="text-slate-300 min-[540px]:[text-shadow:_0px_1px_6px_rgb(0_0_0_/_100%)]">
            Release Date: {getDate(data.release_date)}
          </div>
          <Link
            className="font-bold min-[540px]:[text-shadow:_0px_1px_6px_rgb(0_0_0_/_100%)]"
            href={`https://www.imdb.com/title/${data.imdb_id}/`}
            target="_blank"
            rel="noopener"
          >
            🔗 IMDb
          </Link>
        </div>
        <div className="col-span-2 flex flex-wrap justify-center gap-2 px-2 min-[540px]:row-start-4">
          {data.genres.map((el: { id: number; name: string }) => (
            <div
              className="cursor-pointer rounded-full bg-gray-700 p-2 transition-colors hover:bg-gray-600"
              key={el.id}
            >
              {el.name}
            </div>
          ))}
        </div>
        <div className="col-span-2 px-2">{data.overview}</div>
        <div className="col-span-2 flex flex-wrap justify-evenly gap-2 px-2 min-[540px]:row-start-6">
          {data.keywords.keywords.map((el: { id: number; name: string }) => (
            <div
              className="cursor-pointer rounded-full bg-gray-700 p-2 transition-colors hover:bg-gray-600"
              key={el.id}
            >
              {el.name}
            </div>
          ))}
        </div>
        <div className="col-span-2 aspect-video self-center min-[540px]:col-span-1 min-[540px]:col-start-2 min-[540px]:row-start-1 min-[540px]:mr-8 min-[1000px]:mr-32">
          {trailer && (
            <iframe
              className="h-full w-full"
              width="560"
              height="315"
              src={`https://www.youtube-nocookie.com/embed/${trailer.key}`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              title="YouTube video player"
            />
          )}
        </div>
        <div className="col-span-2 px-2 font-bold">Similar:</div>
        <div className="col-span-2 flex gap-4 overflow-y-hidden px-2 min-[1000px]:pb-4">
          {data.similar.results.map(
            (el: { id: number; title: string; poster_path: string }) => (
              <div key={el.id} className="min-w-[305px]">
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
        </div>
        <div className="col-span-2 px-2 font-bold">Recommendations:</div>
        <div className="col-span-2 flex gap-4 overflow-y-hidden px-2 min-[1000px]:pb-4">
          {data.recommendations.results.map(
            (el: { id: number; title: string; poster_path: string }) => (
              <div key={el.id} className="min-w-[305px]">
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
        </div>
      </div>
    </>
  );
}
