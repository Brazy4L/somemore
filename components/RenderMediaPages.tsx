import Link from 'next/link';
import { toUrl } from './utils';
import CustomImage from './CustomImage';
import questionTall from '../public/question-tall.svg';

export default function RenderMediaPages({
  data,
  type,
}: {
  data: any;
  type: string;
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
              <CustomImage
                className="rounded-2xl"
                width={342}
                height={513}
                src={`https://image.tmdb.org/t/p/w342${el.poster_path}`}
                fallbackSrc={questionTall}
              />
            </Link>
          </div>
        )
      )}
    </>
  );
}
