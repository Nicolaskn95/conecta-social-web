"use client";
import { howToHelpData } from "@/core/constants";
import Image from "next/image";

const HowToHelp = () => {
  return (
    <section id="how-to-help" className="text-center py-10 px-4">
      <h2 className="text-2xl font-bold mb-2">Como ajudar?</h2>
      <p className="sub-title mb-4">Fale conosco</p>
      <div className="grid gap-6 md:grid-cols-3">
        {howToHelpData.map((item, index) => (
          <div key={index} className="card-effect text-center">
            <div className="flex justify-center mb-4">
              <Image
                src={item.src}
                alt={item.alt}
                width={100}
                height={100}
                className="rounded-full"
              />
            </div>
            <h3 className="font-semibold text-lg">{item.title}</h3>
            <p className="mt-2">{item.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HowToHelp;
