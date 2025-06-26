import { Image } from "@imagekit/react";
import { useState, useEffect } from "react";

const Images = ({ src, className, w, h, alt, updatedAt }) => {
  const fallback =
    "https://ik.imagekit.io/ferasraj/favicon.ico?updatedAt=1749780660385";

  // نضيف كاش بريكر بناء على وقت التحديث
  const version =
    updatedAt && new Date(updatedAt).getTime()
      ? `?v=${new Date(updatedAt).getTime()}`
      : "";

  const fullSrc = src ? `${src}${version}` : fallback;

  // نعمل فورس ريمونت كل ما تغير src
  const [imgKey, setImgKey] = useState(fullSrc);

  useEffect(() => {
    setImgKey(fullSrc);
  }, [fullSrc]);

  return (
    <Image
      key={imgKey} // ⛔ هذا مهم جدًا عشان يجبر الريأكت يعيد تحميل الصورة
      urlEndpoint={import.meta.env.VITE_IK_URL_ENDPOINT}
      src={imgKey}
      className={className}
      loading="lazy"
      lqip={{ active: true, quality: 20 }}
      alt={alt}
      width={w}
      height={h}
      transformation={[{ width: w, height: h }]}
      onError={() => setImgKey(fallback)} // لو فشلت، نحول للبديل
    />
  );
};

export default Images;
