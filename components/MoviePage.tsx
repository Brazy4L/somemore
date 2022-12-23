import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import useSWR from 'swr';

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

  return (
    <div key={data.id}>
      <div>{data.title}</div>
      <Image
        width={780}
        height={1170}
        src={`https://image.tmdb.org/t/p/w780${data.poster_path}`}
        alt=""
      />
    </div>
  );
}
