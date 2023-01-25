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
        className="rounded-2xl bg-gray-300 px-2 focus:outline-none focus:ring-2 focus:ring-gray-900 dark:bg-gray-50 dark:text-gray-900 dark:focus:ring-gray-50"
        type="text"
        placeholder="Search..."
        onChange={inputHandler}
        onKeyDown={SearchHandler}
      />
      <Link
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
        <button className="flex" id="button">
          <svg
            className="fill-gray-400 stroke-gray-900 dark:fill-gray-600 dark:stroke-gray-50"
            width="24"
            height="24"
          >
            <path
              stroke-linecap="round"
              stroke-width="3"
              d="m14 13 5.071 4.95"
            />
            <circle cx="8.5" cy="7.5" r="6" />
          </svg>
        </button>
      </Link>
    </div>
  );
}
