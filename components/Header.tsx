import styles from '../styles/Header.module.scss';
import Link from 'next/link';

export default function Header() {
  return (
    <nav className={styles.container}>
      <div>
        <Link href="/">SomeMore</Link>
      </div>
      <div>
        <Link href="/movies">Movies</Link>
      </div>
      <div>
        <Link href="/tvshows">TV Shows</Link>
      </div>
      <div>
        <Link href="/about">About</Link>
      </div>
    </nav>
  );
}
