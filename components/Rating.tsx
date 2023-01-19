import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

export default function Rating(props: any) {
  const { vote } = props;

  const checkRating = (el: number) => {
    return el > 7 ? '0, 255, 140' : el > 2 ? '255, 191, 0' : '255, 69, 69';
  };

  return (
    <CircularProgressbar
      value={vote}
      maxValue={10}
      strokeWidth={12}
      circleRatio={0.704}
      background={true}
      text={`${Math.round(vote * 10) / 10}`}
      styles={{
        path: {
          stroke: `rgb(${checkRating(vote)})`,
          strokeLinecap: 'round',
          transform: 'rotate(-127deg)',
          transformOrigin: 'center center',
        },
        trail: {
          stroke: '#808080',
          strokeLinecap: 'round',
          transform: 'rotate(-127deg)',
          transformOrigin: 'center center',
        },
        text: {
          fill: 'rgb(249,250,251)',
          fontSize: '40px',
          fontWeight: 700,
        },
        background: {
          fill: '#101010',
        },
      }}
    />
  );
}
