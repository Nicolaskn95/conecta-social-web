"use client";
import Image from "next/image";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 w-full max-w-5xl items-center justify-center font-mono text-center lg:flex">
        <div className="flex flex-col ">
          <div className="flex flex-col items-center justify-center">
            <Image fill alt="kids" src={"/images/Rectangle.png"} />
          </div>
        </div>
      </div>
    </main>
  );
}
