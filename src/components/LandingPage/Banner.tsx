import Image from "next/image";

export default function Banner() {
  return (
    <div className="relative w-full h-[300px]">
      <Image
        src={"/images/Rectangle.png"}
        alt="Banner image"
        fill={true}
        objectFit="cover"
        priority={true}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white bg-opacity-50"></div>
    </div>
  );
}
