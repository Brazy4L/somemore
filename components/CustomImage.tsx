import { useState } from 'react';
import Image from 'next/image';

export default function CustomImage(props: any) {
  const { src, fallbackSrc, ...rest } = props;
  const [imgSrc, setImgSrc] = useState(src);
  return (
    <Image
      {...rest}
      src={imgSrc}
      alt=""
      placeholder="blur"
      blurDataURL={
        'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAIAAAADCAQAAAAT4xYKAAAAD0lEQVR42mNU+M/AwAgnABt1A2GYGZ4/AAAAAElFTkSuQmCC'
      }
      onError={() => {
        setImgSrc(fallbackSrc);
      }}
    />
  );
}
