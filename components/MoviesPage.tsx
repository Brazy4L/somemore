import { useState } from 'react';
import { useInView } from 'react-intersection-observer';
import GetNewMoviesPage from './GetNewMoviesPage';

export default function MoviesPage() {
  const [page, setPage] = useState(1);
  const [ref, inView] = useInView({
    threshold: 1,
  });

  const pages = [];
  for (let i = 0; i < page; i++) {
    pages.push(
      <GetNewMoviesPage
        key={i}
        page={i + 1}
        inView={inView}
        setPage={setPage}
      />
    );
  }

  return (
    <>
      {pages}
      <div ref={ref}></div>
    </>
  );
}
