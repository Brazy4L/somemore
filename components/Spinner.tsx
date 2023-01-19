import BeatLoader from 'react-spinners/BeatLoader';

export default function Spinner() {
  return (
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
      <BeatLoader color="#808080" />
    </div>
  );
}
