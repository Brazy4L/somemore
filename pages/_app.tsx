/* eslint-disable @next/next/no-before-interactive-script-outside-document */
import '../styles/globals.css';
import type { AppProps } from 'next/app';
import Script from 'next/script';
import Layout from '../components/Layout';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Script id="apply-theme" strategy="beforeInteractive">
        {`
          const meta = document.createElement('meta');
          meta.name = "color-scheme";
          meta.content = "light";
          document.getElementsByTagName('head')[0].appendChild(meta);
          const dark = localStorage.getItem('theme');
          if ((window.matchMedia('(prefers-color-scheme: dark)').matches && !dark) || (dark === 'true')) {
            document.documentElement.className = 'dark';
            document.querySelector('meta[name="color-scheme"]').content = 'dark';
          }
        `}
      </Script>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  );
}
