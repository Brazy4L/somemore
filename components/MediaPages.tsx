import { useState, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import GetMediaPages from './GetMediaPages';

export default function MediaPages({ type }: { type: string }) {
  const [page, setPage] = useState(1);
  const [ref, inView] = useInView({
    rootMargin: '2160px',
  });

  const pages = [];
  for (let i = 0; i < page; i++) {
    pages.push(<GetMediaPages key={i} apipage={i + 1} type={type} />);
  }

  useEffect(() => {
    if (inView) {
      setPage(page + 1);
    }
  }, [inView, page]);

  return (
    <>
      <div className="mx-auto box-content grid max-w-[1280px] grid-cols-3 justify-center gap-2 px-2 min-[540px]:grid-cols-4 min-[540px]:px-8 min-[800px]:grid-cols-5 min-[1050px]:grid-cols-6">
        {pages}
      </div>
      <div ref={ref}>{inView}</div>
    </>
  );
}
