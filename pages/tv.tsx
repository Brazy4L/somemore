import Head from 'next/head';
import MediaPages from '../components/MediaPages';

export default function TvShows() {
  return (
    <>
      <Head>
        <title>TV Shows | SOMEMORE</title>
      </Head>
      <MediaPages type="tv" />
    </>
  );
}
