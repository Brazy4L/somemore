import { useState } from 'react';
import useSWR from 'swr';

export default function MoviesPage() {
  const [page, setPage] = useState(1);

  const fetcher = (url: RequestInfo | URL) =>
    fetch(url).then((res) => res.json());
  const { data, error, isLoading } = useSWR(
    `/api/movies?page=${page}`,
    fetcher
  );

  if (error) return <div>Failed to load</div>;
  if (isLoading) return <div>Loading...</div>;

  return (
    <>
      {data.results.map((el: { id: number; title: string }) => (
        <div key={el.id}>{el.title}</div>
      ))}
      <button onClick={() => setPage(page + 1)}>LOAD MORE</button>
    </>
  );
}
