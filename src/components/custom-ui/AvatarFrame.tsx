import Image from "next/image";

const AvatarFrame = ({
  className,
  src,
  frame,
  size = 60,
  padding = 2,
}: {
  className?: string;
  src: string;
  frame?: string;
  size?: number;
  padding?: number;
}) => {
  return (
    <div className={`relative ${className ? className : ""}`}>
      {frame && (
        <Image
          className="absolute"
          alt="frame-avatar"
          src={`/AvatarFrame-${frame}.webp`}
          width={size}
          height={size}
        />
      )}

      <Image
        alt="avatar"
        src={src ? src : "/avatar-default.png"}
        className={`p-${padding} rounded-full`}
        width={size}
        height={size}
      />
    </div>
  );
};

export default AvatarFrame;
