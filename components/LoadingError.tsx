import Link from 'next/link';

export default function LoadingError() {
  return (
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
      <div className="font-bold">ERROR</div>
      <div>
        Looks like you couldn&apos;t reach{' '}
        <Link
          className="cursor-pointer underline"
          href="https://www.themoviedb.org/"
          target="_blank"
          rel="noopener"
        >
          TMDb
        </Link>
      </div>
      <div>Check your connection</div>
    </div>
  );
}
