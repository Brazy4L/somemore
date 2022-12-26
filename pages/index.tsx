import styles from '../styles/Home.module.css';
import Link from 'next/link';
import BaseHead from '../components/BaseHead';

export default function Home() {
  return (
    <div className={styles.container}>
      <BaseHead title="SomeMore"/>
      <Link href="/movies">
        <div>Movies</div>
      </Link>
      <Link href="/tvshows">
        <div>TV Shows</div>
      </Link>
    </div>
  );
}
