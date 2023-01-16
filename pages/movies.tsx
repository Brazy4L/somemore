import Head from 'next/head';
import MoviesPage from '../components/MoviesPage';

export default function Movies() {
  return (
    <>
      <Head>
        <title>Movies | SOMEMORE</title>
      </Head>
      <MoviesPage />
    </>
  );
}
