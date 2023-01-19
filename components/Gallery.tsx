import CustomImage from './CustomImage';
import question from '../public/question.svg';

export default function Gallery(props: any) {
  const { hidden, data } = props;
  if (hidden) return null;
  return (
    <>
      {data &&
        Boolean(data.length) &&
        data.map((el: any, index: number) => (
          <CustomImage
            key={index}
            className="min-[342px]:min-w-[342px] min-w-[100%]"
            width={342}
            height={513}
            src={`https://image.tmdb.org/t/p/w342${el.file_path}`}
            fallbackSrc={question}
          />
        ))}
    </>
  );
}
