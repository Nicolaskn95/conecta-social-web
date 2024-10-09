import { Avatar } from "@radix-ui/themes";
import Image from "next/image";

export default function Banner() {
  return (
    <div className="relative w-full h-[300px]">
      <Avatar
        fallback="Banner"
        src={"/images/Rectangle.png"}
        alt="Banner image"
        width={"100"}
        height={"100"}
      />
      <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
        <h1 className="text-4xl font-bold text-white">
          Welcome to Our Website
        </h1>
      </div>
    </div>
  );
}
