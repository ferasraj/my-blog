import { Image } from "@imagekit/react";
import { useState } from "react";

const Images = ({ src, className, w, h, alt }) => {
  const fallback =
    "https://ik.imagekit.io/ferasraj/favicon.ico?updatedAt=1749780660385";
  const [imgSrc, setImgSrc] = useState(src || fallback);

  return (
    <Image
      urlEndpoint={import.meta.env.VITE_IK_URL_ENDPOINT}
      src={imgSrc}
      className={className}
      loading="lazy" // Use "eager" to load immediately. `lazy` is the default value
      lqip={{ active: true, quality: 20 }}
      alt={alt}
      width={w}
      height={h}
      transformation={[{ width: w, height: h }]}
      onError={() => setImgSrc(fallback)} // ✅ لو الصورة تفشل، نحول للفولباك
    />
  );
};

export default Images;
