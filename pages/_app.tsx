/* eslint-disable @next/next/no-before-interactive-script-outside-document */
import '../styles/globals.css';
import type { AppProps } from 'next/app';
import Script from 'next/script';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Script id="apply-theme" strategy="beforeInteractive">
        {`const dark = localStorage.getItem('theme');
    if (window.matchMedia('(prefers-color-scheme: dark)').matches && !dark) {
      document.querySelector('meta[name="color-scheme"]').content = 'dark';
    } else if (dark === 'true') {
      document.documentElement.className = 'dark';
    }`}
      </Script>
      <Component {...pageProps} />
    </>
  );
}
