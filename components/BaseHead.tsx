import Head from 'next/head';

export default function BaseHead(props: { title: string }) {
  return (
    <Head>
      <meta name="color-scheme" content="" />
      <meta name="viewport" content="width=device-width,initial-scale=1" />
      <meta charSet="utf-8" />
      <title>{props.title}</title>
    </Head>
  );
}
