import Image from 'next/image';
import Link from 'next/link';
import { toUrl } from './utils';

export default function RenderMediaPages({
  data,
  type,
}: {
  data: any;
  type: any;
}) {
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
                  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAIAAAADCAQAAAAT4xYKAAAAD0lEQVR42mNU+M/AwAgnABt1A2GYGZ4/AAAAAElFTkSuQmCC'
                }
              />
            </Link>
          </div>
        )
      )}
    </>
  );
}
