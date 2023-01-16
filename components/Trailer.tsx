import ReactPlayer from 'react-player/youtube';

export default function Trailer(props: { trailerKey: string }) {
  if (props.trailerKey === undefined) return <div></div>;
  return (
    <ReactPlayer
      light={true}
      width={`100%`}
      height={`100%`}
      playing={true}
      controls={true}
      url={`https://www.youtube.com/watch?v=${props.trailerKey}`}
    />
  );
}
