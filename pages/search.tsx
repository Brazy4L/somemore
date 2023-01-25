import Head from 'next/head';

export default function SearchMain() {
  return (
    <>
      <Head>
        <title>Search | SOMEMORE</title>
      </Head>
      <div className="flex h-[calc(100vh-60px)] items-center justify-center text-center">
        Type something to search
      </div>
    </>
  );
}
