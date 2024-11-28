"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";

interface CarouselProps {
  images: string[];
  width?: number;
  height?: number;
  autoPlay?: boolean;
  autoPlayInterval?: number;
}

const Carousel: React.FC<CarouselProps> = ({
  images,
  width = 1000,
  height = 1000,
  autoPlay = true,
  autoPlayInterval = 10000,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  useEffect(() => {
    if (autoPlay) {
      const intervalId = setInterval(nextSlide, autoPlayInterval);
      return () => clearInterval(intervalId);
    }
  }, [autoPlay, autoPlayInterval, nextSlide]);

  return (
    <div className="relative w-full max-h-[40rem] overflow-hidden">
      <div
        className="flex transition-transform duration-700"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {images.map((image, index) => (
          <div key={index} className="flex-shrink-0 w-full">
            <Image
              src={image}
              width={width}
              height={height}
              alt={`Slide ${index + 1}`}
              className="w-full object-contain opacity-65"
            />
          </div>
        ))}
      </div>
      <div className="absolute inset-0 h-full bg-gradient-to-b from-transparent via-transparent to-white bg-opacity-100"></div>
      <div className="absolute bottom-1/2 left-1/2 transform -translate-x-1/2 rounded-md bg-opacity-50 p-4 text-center">
        <h1 className="title-gradient">Conecta Social</h1>
        <p className="text-[#090934] ">
          Conectando tecnologia com projetos sociais
        </p>
      </div>
    </div>
  );
};

export default Carousel;
