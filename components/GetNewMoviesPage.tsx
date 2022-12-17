import useSWR from 'swr';

export default function GetNewMoviesPage({ page }) {
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
    </>
  );
}
