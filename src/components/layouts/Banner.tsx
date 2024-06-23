import Image from "next/image";

const Banner = () => {
  return (
    <div className="absolute z-0 left-0 overflow-hidden w-full h-96 bg-cover bg-no-repeat bg-center">
      <Image
        fill
        className="object-center object-cover pointer-events-none"
        src="/banner.webp"
        alt="banner"
      />
    </div>
  );
};

export default Banner;
