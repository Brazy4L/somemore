export default function Trailer(props: { trailerKey: string }) {
  if (props.trailerKey === undefined) return <div>undefined</div>;
  return (
    <>
      <div>{props.trailerKey}</div>
      <iframe
        className="h-full w-full"
        width="560"
        height="315"
        src={`https://www.youtube-nocookie.com/embed/${props.trailerKey}`}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        title="YouTube video player"
      />
    </>
  );
}
