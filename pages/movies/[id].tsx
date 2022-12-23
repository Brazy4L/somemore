import Layout from '../../components/Layout';
import BaseHead from '../../components/BaseHead';
import MoviePage from '../../components/MoviePage';
import { useRouter } from 'next/router';

export default function Idmovie() {
  const { query } = useRouter();

  return (
    <Layout>
      <BaseHead title={`${query.title} | SomeMore`} />
      <MoviePage />
    </Layout>
  );
}
