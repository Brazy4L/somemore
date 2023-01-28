import { useState } from 'react';
import Link from 'next/link';

export default function SearchHeader() {
  const [id, setId] = useState('');

  let inputHandler = (e: any) => {
    let lowerCase = e.target.value.toLowerCase();
    setId(lowerCase);
  };

  let SearchHandler = (e: any) => {
    if (e.key === 'Enter') {
      //@ts-expect-error
      document.getElementById('button').click();
    }
  };

  return (
    <div className="flex h-[28px] items-center gap-1">
      <input
        className="w-[234px] z-10 h-[32px] rounded-2xl bg-gray-300 px-2 pr-[32px] focus:outline-none focus:ring-2 focus:ring-gray-900 dark:bg-gray-50 dark:text-gray-900 dark:focus:ring-gray-50"
        type="text"
        placeholder="Search..."
        onChange={inputHandler}
        onKeyDown={SearchHandler}
      />
      <div className="absolute">
        <Link
          className="relative left-[206px] z-10"
          href={{
            pathname: `/search/${id}`,
          }}
          onClick={() => {
            // @ts-expect-error
            if (document.getElementById('menu')?.checked) {
              document.getElementById('menu')?.click();
            }
          }}
        >
          <button className="flex py-1 pr-1" id="button">
            <svg
              className="fill-gray-500 stroke-gray-800 dark:fill-gray-400 dark:stroke-gray-700"
              width="24"
              height="24"
            >
              <path
                strokeLinecap="round"
                strokeWidth="3"
                d="m14 13 5.071 4.95"
              />
              <circle cx="8.5" cy="7.5" r="6" />
            </svg>
          </button>
        </Link>
      </div>
    </div>
  );
}
