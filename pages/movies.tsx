import Layout from '../components/Layout';
import BaseHead from '../components/BaseHead';
import MoviesPage from '../components/MoviesPage';

export default function Movies() {
  return (
    <Layout>
      <BaseHead title="Movies | SOMEMORE" />
      <MoviesPage />
    </Layout>
  );
}
