import Head from 'next/head';
import MediaPages from '../components/MediaPages';
import { useStore } from '../components/Store';

export default function Movies() {
  const page = useStore((state: any) => state.pageMovie);
  const setPage = useStore((state: any) => state.setPageMovie);
  const pages = useStore((state: any) => state.pagesMovie);
  const setPages = useStore((state: any) => state.setPagesMovie);
  return (
    <>
      <Head>
        <title>Movies | SOMEMORE</title>
      </Head>
      <MediaPages
        type="movie"
        page={page}
        setPage={setPage}
        pages={pages}
        setPages={setPages}
      />
    </>
  );
}
