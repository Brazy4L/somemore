import { Dispatch, SetStateAction } from 'react';
import Link from 'next/link';

export default function Header({
  theme,
  setTheme,
}: {
  theme: boolean;
  setTheme: Dispatch<SetStateAction<boolean>>;
}) {
  return (
    <nav className="sticky top-0 z-20 flex h-[60px] items-center border-b-8 border-[#ffffff] px-2 text-gray-900 dark:border-[#101010] dark:text-gray-50 min-[540px]:px-8">
      <div className="absolute top-0 left-0 -z-10 h-full w-full bg-[#e5e7eb] dark:bg-[#202020]"></div>
      <div className="mr-8 flex-grow text-2xl font-black">
        <Link href="/">SOMEMORE</Link>
      </div>
      <input id="menu" type="checkbox" className="peer hidden" />
      <label htmlFor="menu">
        <div className="grid cursor-pointer gap-1 min-[540px]:hidden">
          <div className="h-1 w-8 rounded-full bg-gray-900 dark:bg-gray-50"></div>
          <div className="h-1 w-8 rounded-full bg-gray-900 dark:bg-gray-50"></div>
          <div className="h-1 w-8 rounded-full bg-gray-900 dark:bg-gray-50"></div>
        </div>
      </label>
      <div className="fixed left-0 top-[-124px] -z-20 grid w-full justify-items-center gap-3 rounded-b-2xl border-b-4 border-[#e5e7eb] bg-[#ffffff] py-5 font-bold transition-[top] duration-[100ms] ease-out peer-checked:top-[52px] dark:border-[#202020] dark:bg-[#101010] min-[540px]:static min-[540px]:z-0 min-[540px]:w-auto min-[540px]:grid-flow-col min-[540px]:border-0 min-[540px]:bg-inherit min-[540px]:py-0 dark:min-[540px]:bg-inherit">
        <Link
          onClick={() => {
            // @ts-expect-error
            if (document.getElementById('menu')?.checked) {
              document.getElementById('menu')?.click();
            }
          }}
          href="/movie"
        >
          Movies
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
          TV Shows
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
          About
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
          {theme ? <div>🌝</div> : <div>🌚</div>}
        </button>
      </div>
    </nav>
  );
}
