import { useState } from "react";
import Image, { ImageProps } from "next/image";

type SafeImageProps = ImageProps & {
  fallback?: string;
};

export default function SafeImage({
  src,
  fallback = "/staff/dummy.png",
  alt,
  ...props
}: SafeImageProps) {
  const [imgSrc, setImgSrc] = useState(src);

  return (
    <Image
      {...props}
      src={imgSrc}
      alt={alt}
      onError={() => {
        if (imgSrc !== fallback) {
          setImgSrc(fallback);
        }
      }}
    />
  );
}
