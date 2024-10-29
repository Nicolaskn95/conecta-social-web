import Image from "next/image";

interface BannerProps {
  imagePath: string;
}

export default function Banner({ imagePath }: BannerProps) {
  return (
    <div className="relative w-full h-[300px]">
      <Image
        src={imagePath}
        alt="Banner image"
        fill={true}
        objectFit="cover"
        priority={true}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white bg-opacity-50"></div>
    </div>
  );
}
