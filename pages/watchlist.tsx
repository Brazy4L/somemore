import Head from 'next/head';
import WatchlistPage from '../components/Watchlist';

export default function Watchlist() {
  return (
    <>
      <Head>
        <title>SOMEMORE | Watchlist</title>
      </Head>
      <WatchlistPage />
    </>
  );
}
