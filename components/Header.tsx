import styles from '../styles/Header.module.css';
import Link from 'next/link';

export default function Header() {
  return (
    <nav className={styles.container}>
      <div className={styles.bg}></div>
      <div className={styles.logo}>
        <Link href="/">SOMEMORE</Link>
      </div>
      <ul className={styles.links}>
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
      <input type="checkbox" id={styles.menu} />
      <label htmlFor={styles.menu}>
        <div className={styles.burger}>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </label>
      <div className={styles.menulinkscontainer}>
        <ul className={styles.menulinks}>
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
