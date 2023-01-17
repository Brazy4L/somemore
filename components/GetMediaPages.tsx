import Image from 'next/image';
import Link from 'next/link';
import { toUrl } from './utils';

export default function GetMediaPages({
  data,
  isLoading,
  type,
}: {
  data: any;
  isLoading: boolean;
  type: any;
}) {
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
        (el: {
          id: number;
          title: string;
          poster_path: string;
          name: string;
        }) => (
          <div key={el.id}>
            <Link
              href={{
                pathname: `/${type}/${el.id}`,
                query: `${toUrl(el.title || el.name)}`,
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
