import { Dispatch, SetStateAction } from 'react';
import Link from 'next/link';
import SearchHeader from './SearchHeader';

export default function Header({
  theme,
  setTheme,
}: {
  theme: boolean;
  setTheme: Dispatch<SetStateAction<boolean>>;
}) {
  return (
    <nav className="sticky top-0 z-20 flex h-[60px] items-center border-b-8 border-[#ffffff] px-2 text-gray-900 dark:border-[#101010] dark:text-gray-50 min-[540px]:px-8">
      <div className="absolute top-0 left-0 -z-10 h-full w-full bg-gray-200 dark:bg-[#202020]"></div>
      <div className="">
        <Link className="" href="/">
          <svg
            className="fill-gray-900 dark:fill-gray-50"
            width="214"
            height="29"
          >
            <path d="M10.094 1.766c1.46 0 2.66.21 3.6.63.964.421 1.805.866 2.523 1.336v3.452c-.693-.52-1.534-1.002-2.524-1.448-.99-.47-2.065-.705-3.228-.705-.742 0-1.522.136-2.338.408a4.632 4.632 0 0 0-2.004 1.225c-.544.57-.816 1.299-.816 2.19 0 .99.358 1.744 1.076 2.263.717.52 1.583 1.014 2.597 1.485l3.415 1.558c1.707.767 2.993 1.62 3.859 2.56.866.94 1.299 2.19 1.299 3.749 0 1.36-.396 2.56-1.188 3.6-.791 1.014-1.83 1.818-3.117 2.412-1.286.593-2.697.89-4.23.89-1.435 0-2.759-.247-3.971-.742-1.212-.495-2.264-1.052-3.154-1.67v-3.451a19.794 19.794 0 0 0 3.302 1.818c1.262.52 2.685.78 4.268.78 1.237 0 2.325-.31 3.266-.928.94-.619 1.41-1.472 1.41-2.56a2.32 2.32 0 0 0-.594-1.596 5.228 5.228 0 0 0-1.373-1.15 13.94 13.94 0 0 0-1.596-.817l-4.119-1.856c-1.781-.791-2.993-1.72-3.637-2.783-.643-1.064-.965-2.288-.965-3.674 0-1.311.372-2.486 1.114-3.525.767-1.064 1.781-1.905 3.043-2.524a9.149 9.149 0 0 1 4.082-.927Zm24.27-.186c1.88 0 3.611.346 5.195 1.04a12.915 12.915 0 0 1 4.156 2.782A12.429 12.429 0 0 1 46.46 9.56c.668 1.558 1.002 3.228 1.002 5.01a12.85 12.85 0 0 1-1.002 5.046 12.526 12.526 0 0 1-2.746 4.12 13.43 13.43 0 0 1-4.156 2.82c-1.584.668-3.316 1.002-5.196 1.002s-3.612-.334-5.195-1.002a13.43 13.43 0 0 1-4.156-2.82 13.027 13.027 0 0 1-2.784-4.12 13.28 13.28 0 0 1-.964-5.047c0-1.78.321-3.45.965-5.01a12.915 12.915 0 0 1 2.783-4.156 12.914 12.914 0 0 1 4.156-2.783c1.583-.693 3.315-1.039 5.195-1.039Zm0 3.266c-1.856 0-3.514.42-4.973 1.261a9.164 9.164 0 0 0-3.451 3.489c-.842 1.46-1.262 3.117-1.262 4.972 0 1.856.42 3.513 1.261 4.973a9.523 9.523 0 0 0 3.452 3.488c1.46.841 3.117 1.262 4.972 1.262 1.856 0 3.513-.42 4.973-1.262a9.522 9.522 0 0 0 3.451-3.488c.841-1.46 1.262-3.117 1.262-4.973 0-1.855-.42-3.513-1.262-4.972a9.164 9.164 0 0 0-3.451-3.489c-1.46-.84-3.117-1.261-4.973-1.261Zm42.155-2.71V27h-3.34V9.002l-7.681 8.201h-.89L56.74 9.002V27H53.4V2.137h1.04l10.613 11.392L75.48 2.137h1.038Zm23.602 10.54v3.154H88.023v8.016h13.694V27H84.684V2.137h17.033V5.29H88.023v7.385h12.098Zm31.766-10.54V27h-3.34V9.002l-7.682 8.201h-.89l-7.868-8.201V27h-3.339V2.137h1.039l10.613 11.392 10.428-11.392h1.039Zm19.037-.556c1.88 0 3.612.346 5.195 1.04a12.912 12.912 0 0 1 4.156 2.782 12.418 12.418 0 0 1 2.746 4.157c.668 1.558 1.002 3.228 1.002 5.01a12.85 12.85 0 0 1-1.002 5.046 12.514 12.514 0 0 1-2.746 4.12 13.427 13.427 0 0 1-4.156 2.82c-1.583.668-3.315 1.002-5.195 1.002-1.88 0-3.612-.334-5.195-1.002a13.432 13.432 0 0 1-4.157-2.82 13.035 13.035 0 0 1-2.783-4.12 13.284 13.284 0 0 1-.965-5.047c0-1.78.322-3.45.965-5.01a12.923 12.923 0 0 1 2.783-4.156 12.916 12.916 0 0 1 4.157-2.783c1.583-.693 3.315-1.039 5.195-1.039Zm0 3.266c-1.856 0-3.513.42-4.973 1.261a9.168 9.168 0 0 0-3.451 3.489c-.841 1.46-1.262 3.117-1.262 4.972 0 1.856.421 3.513 1.262 4.973a9.526 9.526 0 0 0 3.451 3.488c1.46.841 3.117 1.262 4.973 1.262 1.855 0 3.513-.42 4.972-1.262a9.521 9.521 0 0 0 3.452-3.488c.841-1.46 1.261-3.117 1.261-4.973 0-1.855-.42-3.513-1.261-4.972a9.163 9.163 0 0 0-3.452-3.489c-1.459-.84-3.117-1.261-4.972-1.261Zm28.574-2.71c1.435 0 2.808.273 4.119.817a7.374 7.374 0 0 1 3.229 2.45c.866 1.088 1.299 2.486 1.299 4.193 0 1.534-.446 2.832-1.336 3.896-.866 1.064-1.98 1.868-3.34 2.412-1.336.52-2.722.78-4.157.78-.445 0-1.039-.025-1.781-.075L189.109 27h-5.121l-10.687-10.39V27h-3.34V2.137h9.537Zm-6.197 3.155v7.979a19.66 19.66 0 0 0 2.672.52 22.45 22.45 0 0 0 2.857.185c1.88 0 3.328-.396 4.342-1.188 1.039-.792 1.558-1.855 1.558-3.191 0-1.386-.569-2.45-1.707-3.192-1.113-.742-2.474-1.113-4.082-1.113h-5.64ZM209 12.676v3.154h-12.098v8.016h13.694V27h-17.034V2.137h17.034V5.29h-13.694v7.385H209Z" />
          </svg>
        </Link>
      </div>
      <input id="menu" type="checkbox" className="peer hidden" />
      <label htmlFor="menu" className="ml-auto">
        <div className="grid cursor-pointer gap-1 min-[810px]:hidden">
          <div className="h-1 w-8 rounded-full bg-gray-900 dark:bg-gray-50"></div>
          <div className="h-1 w-8 rounded-full bg-gray-900 dark:bg-gray-50"></div>
          <div className="h-1 w-8 rounded-full bg-gray-900 dark:bg-gray-50"></div>
        </div>
      </label>
      <div className="fixed left-0 top-[-216px] -z-20 ml-auto grid w-full justify-items-center gap-6 rounded-b-2xl border-b-4 border-[#e5e7eb] bg-[#ffffff] py-5 font-semibold transition-[top] duration-[100ms] ease-out peer-checked:top-[52px] dark:border-[#202020] dark:bg-[#101010] min-[810px]:static min-[810px]:z-0 min-[810px]:w-auto min-[810px]:grid-flow-col min-[810px]:border-0 min-[810px]:bg-inherit min-[810px]:py-0 dark:min-[810px]:bg-inherit">
        <SearchHeader />
        <Link
          onClick={() => {
            // @ts-expect-error
            if (document.getElementById('menu')?.checked) {
              document.getElementById('menu')?.click();
            }
          }}
          href="/movie"
        >
          MOVIES
        </Link>
        <Link
          onClick={() => {
            // @ts-expect-error
            if (document.getElementById('menu')?.checked) {
              document.getElementById('menu')?.click();
            }
          }}
          href="/tv"
        >
          TV
        </Link>
        <Link
          onClick={() => {
            // @ts-expect-error
            if (document.getElementById('menu')?.checked) {
              document.getElementById('menu')?.click();
            }
          }}
          href="/about"
        >
          ABOUT
        </Link>
        <button
          onClick={() => {
            setTheme(!theme);
            localStorage.setItem('theme', JSON.stringify(!theme));
            const css = document.createElement('style');
            css.type = 'text/css';
            css.appendChild(
              document.createTextNode(
                `* {
                      -webkit-transition: none !important;
                      -moz-transition: none !important;
                      -o-transition: none !important;
                      -ms-transition: none !important;
                      transition: none !important;
                    }
                `
              )
            );
            document.head.appendChild(css);
            document.documentElement.className = theme ? '' : 'dark';
            const _ = window.getComputedStyle(css).opacity;
            document.head.removeChild(css);
            // @ts-expect-error
            document.querySelector('meta[name="color-scheme"]').content = theme
              ? 'light'
              : 'dark';
          }}
        >
          {theme ? (
            <svg
              className="h-[28px] fill-gray-400 stroke-gray-400"
              width="24"
              height="24"
            >
              <path d="M18 12c0 5.523-4.477 10-10 10s2-4.477 2-10S2.477 2 8 2s10 4.477 10 10Z" />
            </svg>
          ) : (
            <svg
              className="h-[28px] fill-gray-300 stroke-gray-700"
              width="24"
              height="24"
            >
              <circle cx="12" cy="12" r="4" strokeWidth="4" />
              <path
                strokeWidth="2"
                d="M12 5V2M12 22v-3M17.293 6.455l2.828-2.828M16.707 17.293l2.828 2.828M3.707 3.293l2.829 2.828M3.293 20.455l2.828-2.828M19 12h2M3 12h2"
              />
            </svg>
          )}
        </button>
      </div>
    </nav>
  );
}
