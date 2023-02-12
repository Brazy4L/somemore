import Image from 'next/image';
import Link from 'next/link';
import tmdb from '../public/tmdb.svg';

export default function AboutPage() {
  return (
    <div className="mx-1 flex h-[calc(100vh-60px)] flex-col items-center justify-center justify-items-center gap-4">
      <div className="text-center">
        This product uses the TMDB API but is not endorsed or certified by TMDB.
      </div>
      <Link
        className="cursor-pointer"
        href="https://www.themoviedb.org/"
        target="_blank"
        rel="noopener"
      >
        <Image src={tmdb} alt="" priority={true} />
      </Link>
    </div>
  );
}
