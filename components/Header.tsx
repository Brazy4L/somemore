import styles from '../styles/Header.module.scss';
import Link from 'next/link';

export default function Header() {
  return (
    <nav className={styles.container}>
      <div>
        <Link href="/">SOMEMORE</Link>
      </div>
      <ul>
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
    </nav>
  );
}
