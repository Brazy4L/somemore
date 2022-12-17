import { useState } from 'react';
import useSWR from 'swr';
import GetNewMoviesPage from './GetNewMoviesPage';

export default function MoviesPage() {
  const [page, setPage] = useState(1);
  const pages = [];
  for (let i = 0; i < page; i++) {
    pages.push(<GetNewMoviesPage page={i + 1} key={i} />);
  }

  return (
    <>
      {pages}
      <button onClick={() => setPage(page + 1)}>LOAD MORE</button>
    </>
  );
}
