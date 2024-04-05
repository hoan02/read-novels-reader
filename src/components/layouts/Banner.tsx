import Image from "next/image";

const Banner = () => {
  return (
    <Image
      src="/banner.webp"
      alt="banner"
      priority
      width={0}
      height={0}
      sizes="100vw"
      style={{ width: "100%", height: "auto" }}
    />
  );
};

export default Banner;
