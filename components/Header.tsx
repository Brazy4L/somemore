import { Dispatch, SetStateAction } from 'react';
import Link from 'next/link';

interface Meta {
  content: string;
}

export default function Header({
  theme,
  setTheme,
}: {
  theme: boolean;
  setTheme: Dispatch<SetStateAction<boolean>>;
}) {
  return (
    <nav className="sticky top-0 z-20 flex h-[60px] items-center border-b-8 border-[#ffffff] px-2 text-gray-900  dark:border-[#101010] dark:text-gray-50 min-[540px]:px-8">
      <div className="absolute top-0 left-0 -z-10 h-full w-full bg-[#e5e7eb]  dark:bg-[#202020]"></div>
      <div className="mr-8 flex-grow text-2xl font-black">
        <Link href="/">SOMEMORE</Link>
      </div>
      <ul className="hidden gap-4 font-bold min-[540px]:flex">
        <li>
          <Link href="/movies">Movies</Link>
        </li>
        <li>
          <Link href="/tvshows">TV Shows</Link>
        </li>
        <li>
          <Link href="/about">About</Link>
        </li>
        <li>
          <button
            onClick={() => {
              setTheme(!theme);
              localStorage.setItem('theme', JSON.stringify(!theme));
              document.documentElement.className = theme ? '' : 'dark';
              // @ts-ignore
              document.querySelector('meta[name="color-scheme"]').content =
                theme ? '' : 'dark';
            }}
          >
            {theme && <div>🌝</div>}
            {!theme && <div>🌚</div>}
          </button>
        </li>
      </ul>
      <input id="menu" type="checkbox" className="peer hidden" />
      <label htmlFor="menu">
        <div className="grid cursor-pointer gap-1 min-[540px]:hidden">
          <div className="h-1 w-8 rounded-full bg-black"></div>
          <div className="h-1 w-8 rounded-full bg-black"></div>
          <div className="h-1 w-8 rounded-full bg-black"></div>
        </div>
      </label>
      <div className="fixed left-0 top-[-120px] -z-20 w-full rounded-b-2xl bg-[#7db8e8] py-5 transition-[top] duration-[100ms] ease-out peer-checked:top-[52px]">
        <ul className="grid justify-items-center gap-3 font-bold">
          <li>
            <Link tabIndex={-1} href="/movies">
              Movies
            </Link>
          </li>
          <li>
            <Link tabIndex={-1} href="/tvshows">
              TV Shows
            </Link>
          </li>
          <li>
            <Link tabIndex={-1} href="/about">
              About
            </Link>
          </li>
          <li>
            <button
              tabIndex={-1}
              onClick={() => {
                setTheme(!theme);
                localStorage.setItem('theme', JSON.stringify(!theme));
                document.documentElement.className = theme ? '' : 'dark';
              }}
            >
              {theme && <div>🌝</div>}
              {!theme && <div>🌚</div>}
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
}
