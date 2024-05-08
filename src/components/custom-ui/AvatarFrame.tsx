import Image from "next/image";

const AvatarFrame = ({
  className,
  src,
  role,
  size = 60,
}: {
  className?: string;
  src: string;
  role?: string;
  size?: number;
}) => {
  return (
    <div className={`relative ${className}`}>
      {role && (
        <Image
          className="absolute"
          alt="frame-avatar"
          src={`/AvatarFrame-${role}.webp`}
          width={size}
          height={size}
        />
      )}
      <Image
        alt="avatar"
        className="p-2 rounded-full"
        src={src ? src : "/avatar-default.png"}
        width={size}
        height={size}
      />
    </div>
  );
};

export default AvatarFrame;
