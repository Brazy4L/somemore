import { useState } from 'react';
import { useInView } from 'react-intersection-observer';
import GetMoviesPage from './GetMoviesPage';

export default function MoviesPage() {
  const [page, setPage] = useState(1);
  const [ref, inView] = useInView({
    rootMargin: '2160px',
  });

  const pages = [];
  for (let i = 0; i < page; i++) {
    pages.push(
      <GetMoviesPage
        key={i}
        page={i + 1}
        inView={inView}
        setPage={setPage}
      />
    );
  }

  return (
    <>
      <div className="mx-auto box-content grid max-w-[1280px] grid-cols-6 justify-center gap-2 px-8 max-[1050px]:grid-cols-5 max-[800px]:grid-cols-4 max-[540px]:grid-cols-3 max-[540px]:px-2">
        {pages}
      </div>
      <p ref={ref}></p>
    </>
  );
}
