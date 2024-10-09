import { Button } from "@radix-ui/themes";
import Image from "next/image";
import React from "react";
// import { Button } from "@";

const About = () => {
  return (
    <div className="text-center my-12">
      <Image
        src="/images/sea.jpg"
        alt="Sobre"
        className="w-full h-64 object-cover"
      />
      <div className="max-w-2xl mx-auto mt-8">
        <p className="text-lg text-gray-700">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit...
        </p>
        <Button className="bg-gray-800 mt-4">Saiba Mais</Button>
      </div>
    </div>
  );
};

export default About;
