import Head from 'next/head';
import MediaPages from '../components/MediaPages';

export default function Movies() {
  return (
    <>
      <Head>
        <title>Movies | SOMEMORE</title>
      </Head>
      <MediaPages type="movie" />
    </>
  );
}
