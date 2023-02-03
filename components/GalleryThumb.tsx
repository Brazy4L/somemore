import styles from '../styles/gallery.module.css';
import CustomImage from './CustomImage';
import questionTall from '../public/question-tall.svg';

export const Thumb = (props: any) => {
  const { selected, imgSrc, index, onClick } = props;

  return (
    <div
      className={`${styles.thumbsSlide}`.concat(
        selected ? ` ${styles.thumbsSlideSelected}` : ''
      )}
    >
      <button onClick={onClick} className={styles.thumbsSlideButton}>
        <CustomImage
          key={index}
          className={styles.thumbsSlideImg}
          width={342}
          height={513}
          src={imgSrc}
          fallbackSrc={questionTall}
        />
      </button>
    </div>
  );
};
