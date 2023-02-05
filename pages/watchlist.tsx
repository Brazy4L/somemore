import Head from 'next/head';
import WatchlistPage from '../components/Watchlist';

export default function Watchlist() {
  return (
    <>
      <Head>
        <title>Watchlist | SOMEMORE</title>
      </Head>
      <WatchlistPage />
    </>
  );
}
