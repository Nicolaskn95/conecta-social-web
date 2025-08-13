'use client';
import Image from 'next/image';
import React, { useEffect, useState, useCallback } from 'react';

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
   autoPlayInterval = 5000,
}) => {
   const [currentIndex, setCurrentIndex] = useState(0);
   const [isTransitioning, setIsTransitioning] = useState(false);
   const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
   const [direction, setDirection] = useState<'next' | 'prev'>('next');

   const nextSlide = useCallback(() => {
      if (!isTransitioning) {
         setDirection('next');
         setIsTransitioning(true);
         setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
         setTimeout(() => setIsTransitioning(false), 800);
      }
   }, [images.length, isTransitioning]);

   const goToSlide = useCallback(
      (index: number) => {
         if (!isTransitioning && index !== currentIndex) {
            setDirection(index > currentIndex ? 'next' : 'prev');
            setIsTransitioning(true);
            setCurrentIndex(index);
            setTimeout(() => setIsTransitioning(false), 800);
         }
      },
      [currentIndex, isTransitioning]
   );

   // Mouse tracking for 3D effect
   const handleMouseMove = useCallback((e: React.MouseEvent) => {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;
      setMousePosition({ x, y });
   }, []);

   // Auto-play functionality
   useEffect(() => {
      if (autoPlay) {
         const intervalId = setInterval(nextSlide, autoPlayInterval);
         return () => clearInterval(intervalId);
      }
   }, [autoPlay, autoPlayInterval, nextSlide]);

   return (
      <div
         className="relative w-full h-screen overflow-hidden bg-gradient-to-br from-text_color via-primary to-text_color"
         onMouseMove={handleMouseMove}
      >
         {/* Animated Background Particles */}
         <div className="absolute inset-0 overflow-hidden">
            {[...Array(20)].map((_, i) => (
               <div
                  key={i}
                  className="absolute w-2 h-2 bg-white/20 rounded-full animate-pulse"
                  style={{
                     left: `${Math.random() * 100}%`,
                     top: `${Math.random() * 100}%`,
                     animationDelay: `${Math.random() * 3}s`,
                     animationDuration: `${2 + Math.random() * 3}s`,
                  }}
               />
            ))}
         </div>

         {/* Elegant Fade Carousel Container */}
         <div className="relative w-full h-full overflow-hidden">
            {images.map((image, index) => (
               <div
                  key={index}
                  className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
                     index === currentIndex
                        ? 'opacity-100 scale-100'
                        : 'opacity-0 scale-105'
                  }`}
               >
                  <Image
                     src={image}
                     width={width}
                     height={height}
                     alt={`Slide ${index + 1}`}
                     className="w-full h-full object-cover opacity-60"
                     priority={index === 0}
                  />
                  {/* Elegant Gradient Overlays */}
                  <div className="absolute inset-0 bg-gradient-to-t from-white/70 via-white/10 to-transparent"></div>
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-transparent to-secondary/20"></div>
                  <div className="absolute inset-0 bg-gradient-radial from-transparent via-white/5 to-white/50"></div>
               </div>
            ))}
         </div>

         {/* Floating Content Cards with Elegant Animations */}
         <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="text-center text-white px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
               {/* Main Title with Elegant Glassmorphism */}
               <div className="mb-12 relative">
                  <div className="backdrop-blur-md bg-white/10 rounded-3xl p-8 border border-white/20 shadow-2xl transition-all duration-500 hover:bg-white/15 hover:border-white/30">
                     <h1 className="text-7xl md:text-8xl lg:text-9xl font-black mb-6">
                        <span className="bg-gradient-to-r from-[#40789b] to-[#1ea1ff] bg-clip-text text-transparent drop-shadow-[0px_0px_40px_rgba(0,0,0,1)]">
                           Conecta Social
                        </span>
                     </h1>
                     <div className="w-40 h-1 bg-gradient-to-r from-primary via-secondary to-primary mx-auto rounded-full shadow-lg shadow-primary/50 transition-all duration-500 hover:w-48"></div>
                  </div>
               </div>

               {/* Floating Subtitle Card */}
               <div className="backdrop-blur-lg bg-white/5 rounded-2xl p-6 border border-white/10 shadow-xl transition-all duration-500 hover:bg-white/10 hover:border-white/20">
                  <p className="text-2xl md:text-3xl lg:text-4xl font-light leading-relaxed">
                     <span className="bg-gradient-to-r from-[#40789b] to-[#1ea1ff] bg-clip-text text-transparent drop-shadow-[0_0_25px_rgba(56,122,161,0.7)]">
                        Conectando tecnologia
                     </span>{' '}
                     <span className="text-white/95 drop-shadow-[0_0_15px_rgba(255,255,255,0.6)]">
                        com projetos sociais
                     </span>
                  </p>
               </div>
            </div>
         </div>

         {/* Modern Animated Border Effect */}
         <div className="absolute inset-0 rounded-none border-2 border-white/10 animate-pulse transition-all duration-1000"></div>

         {/* Progress Indicator */}
         <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-white/20 rounded-full overflow-hidden">
            <div
               className="h-full bg-gradient-to-r from-primary to-secondary rounded-full transition-all duration-800 ease-[cubic-bezier(0.4,0,0.2,1)]"
               style={{
                  width: `${((currentIndex + 1) / images.length) * 100}%`,
               }}
            ></div>
         </div>
      </div>
   );
};

export default Carousel;
