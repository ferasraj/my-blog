import { Image } from "@imagekit/react";

const Images = ({ src, className, w, h, alt }) => {
  return (
    <Image
      urlEndpoint={import.meta.env.VITE_IK_URL_ENDPOINT}
      src={src}
      className={className}
      loading="lazy" // Use "eager" to load immediately. `lazy` is the default value
      lqip={{ active: true, quality: 20 }}
      alt={alt}
      width={w}
      height={h}
    />
  );
};

export default Images;
