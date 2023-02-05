import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useStore } from '../components/Store';

export default function MediaNavigation() {
  const { pathname } = useRouter();
  const setNav = useStore((state: any) => state.setNav);
  useEffect(() => {
    setNav(pathname);
  }, [pathname, setNav]);
  return (
    <div className="mx-auto box-content grid max-w-[1280px] gap-2 px-2 pt-[1.65rem] pb-[2.15rem]">
      <div className="flex justify-center">
        <Link
          className={`grid h-10 w-32 items-center justify-center rounded-l-2xl bg-gray-200 font-semibold dark:bg-[#202020]`.concat(
            pathname === '/' ? ' bg-gray-400 dark:bg-gray-600' : ''
          )}
          href="/"
        >
          MOVIES
        </Link>
        <Link
          className={`grid h-10 w-32 items-center justify-center rounded-r-2xl bg-gray-200 font-semibold dark:bg-[#202020]`.concat(
            pathname === '/tv' ? ' bg-gray-400 dark:bg-gray-600' : ''
          )}
          href="/tv"
        >
          TV
        </Link>
      </div>
    </div>
  );
}
