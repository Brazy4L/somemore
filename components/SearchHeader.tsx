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
    <div className="left-[50%] flex h-[28px] items-center gap-1 min-[780px]:absolute min-[780px]:-translate-x-[50%]">
      <input
        className="z-10 h-[32px] w-[256px] rounded-lg bg-gray-400 px-2 pr-[32px] placeholder:text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-600 dark:bg-gray-600 dark:placeholder:text-gray-50 dark:focus:ring-gray-400"
        type="text"
        placeholder="Search..."
        onChange={inputHandler}
        onKeyDown={SearchHandler}
      />
      <div className="absolute">
        <Link
          className="relative left-[228px] z-10"
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
              className="fill-gray-100 stroke-gray-700 dark:fill-gray-500 dark:stroke-gray-100"
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
