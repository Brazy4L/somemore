import styles from '../styles/gallery.module.css';
import { useState, useEffect, useCallback } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { Thumb } from './GalleryThumb';
import CustomImage from './CustomImage';
import questionTall from '../public/question-tall.svg';

export default function Gallery2(props: any) {
  const { hidden, data } = props;
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [emblaMainRef, emblaMainApi] = useEmblaCarousel();
  const [emblaThumbsRef, emblaThumbsApi] = useEmblaCarousel({
    dragFree: true,
  });

  const onThumbClick = useCallback(
    (index: number) => {
      if (!emblaMainApi || !emblaThumbsApi) return;
      if (emblaThumbsApi.clickAllowed()) emblaMainApi.scrollTo(index);
    },
    [emblaMainApi, emblaThumbsApi]
  );

  const onSelect = useCallback(() => {
    if (!emblaMainApi || !emblaThumbsApi) return;
    setSelectedIndex(emblaMainApi.selectedScrollSnap());
    emblaThumbsApi.scrollTo(emblaMainApi.selectedScrollSnap());
  }, [emblaMainApi, emblaThumbsApi, setSelectedIndex]);

  useEffect(() => {
    if (!emblaMainApi) return;
    onSelect();
    emblaMainApi.on('select', onSelect);
    emblaMainApi.on('reInit', onSelect);
  }, [emblaMainApi, onSelect]);

  if (hidden) return null;

  return (
    <div className={styles.containerContainer}>
      <div ref={emblaMainRef}>
        <div className={styles.container}>
          {data.map((el: any, index: number) => (
            <div className={styles.slide} key={index}>
              <CustomImage
                key={index}
                width={342}
                height={513}
                src={`https://image.tmdb.org/t/p/w342${el.file_path}`}
                fallbackSrc={questionTall}
              />
            </div>
          ))}
        </div>
      </div>

      <div className={styles.thumbs}>
        <div ref={emblaThumbsRef}>
          <div className={styles.thumbsContainer}>
            {data.map((el: any, index: number) => (
              <Thumb
                onClick={() => onThumbClick(index)}
                selected={index === selectedIndex}
                index={index}
                imgSrc={`https://image.tmdb.org/t/p/w342${el.file_path}`}
                key={index}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
