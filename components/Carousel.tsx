import styles from '../styles/carousel.module.css';
import useEmblaCarousel from 'embla-carousel-react';

export default function Carousel({ children }: React.PropsWithChildren) {
  const [emblaRef] = useEmblaCarousel({
    align: 0,
    slidesToScroll: 'auto',
  });

  return (
    <div className={styles.viewport} ref={emblaRef}>
      <div className={styles.container}>{children}</div>
    </div>
  );
}
