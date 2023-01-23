import Head from 'next/head';
import MediaPages from '../components/MediaPages';
import { useStore } from '../components/Store';

export default function TvShows() {
  const page = useStore((state: any) => state.pageTv);
  const setPage = useStore((state: any) => state.setPageTv);
  const pages = useStore((state: any) => state.pagesTv);
  const setPages = useStore((state: any) => state.setPagesTv);
  return (
    <>
      <Head>
        <title>TV Shows | SOMEMORE</title>
      </Head>
      <MediaPages
        type="tv"
        page={page}
        setPage={setPage}
        pages={pages}
        setPages={setPages}
      />
    </>
  );
}
