import Link from 'next/link';

export default function Header() {
  return (
    <nav className="sticky top-0 flex items-center border-b-8 border-[#040e16] px-8 py-4 max-[540px]:px-2">
      <div className="absolute top-0 left-0 -z-10 h-full w-full bg-[#67ace4]"></div>
      <div className="mr-8 flex-grow text-2xl font-black">
        <Link href="/">SOMEMORE</Link>
      </div>
      <ul className="flex gap-4 font-bold max-[540px]:hidden">
        <li>
          <Link href="/movies">Movies</Link>
        </li>
        <li>
          <Link href="/tvshows">TV Shows</Link>
        </li>
        <li>
          <Link href="/about">About</Link>
        </li>
      </ul>
      <input id="menu" type="checkbox" className="peer hidden" />
      <label htmlFor="menu">
        <div className="hidden cursor-pointer gap-1 max-[540px]:grid">
          <div className="h-1 w-8 rounded-full bg-black"></div>
          <div className="h-1 w-8 rounded-full bg-black"></div>
          <div className="h-1 w-8 rounded-full bg-black"></div>
        </div>
      </label>
      <div className="fixed left-0 top-[-96px] -z-20 w-full rounded-b-2xl bg-[#7db8e8] py-8 transition-[top] duration-[100ms] ease-out peer-checked:top-[64px]">
        <ul className="grid justify-items-center gap-3 font-bold">
          <li>
            <Link href="/movies">Movies</Link>
          </li>
          <li>
            <Link href="/tvshows">TV Shows</Link>
          </li>
          <li>
            <Link href="/about">About</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
