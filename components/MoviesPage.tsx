import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import GetNewMoviesPage from './GetNewMoviesPage';

export default function MoviesPage() {
  const [page, setPage] = useState(1);
  const [ref, inView, entry] = useInView({
    /* Optional options */
    threshold: 1,
  });

  useEffect(() => {
    if (inView) {
      setPage(page + 1);
    }
  });

  const pages = [];
  for (let i = 0; i < page; i++) {
    pages.push(<GetNewMoviesPage page={i + 1} key={i} />);
  }

  return (
    <>
      {pages}
      <div ref={ref}></div>
    </>
  );
}
