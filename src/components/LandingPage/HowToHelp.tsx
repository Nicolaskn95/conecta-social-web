'use client';
import { howToHelpData } from '@/core/constants';
import Image from 'next/image';

const HowToHelp = () => {
   return (
      <section id="how-to-help" className="text-center">
         {/* Section Header */}
         <div className="mb-16">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-text_color mb-4">
               Como ajudar?
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-primary to-secondary mx-auto mb-6"></div>
            <p className="text-xl text-primary font-light tracking-wide">
               Fale conosco e descubra como fazer a diferença
            </p>
         </div>

         {/* Cards Grid */}
         <div className="max-w-6xl mx-auto">
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
               {howToHelpData.map((item, index) => (
                  <div
                     key={index}
                     className="group bg-white rounded-2xl p-8 shadow-lg border border-gray-100 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer"
                  >
                     {/* Image Container */}
                     <div className="relative mb-6">
                        <div className="w-24 h-24 mx-auto bg-gradient-to-br from-primary/10 to-secondary/10 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                           <Image
                              src={item.src}
                              alt={item.alt}
                              width={80}
                              height={80}
                              className="rounded-full object-cover"
                           />
                        </div>
                        {/* Decorative element */}
                        <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-primary to-secondary rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                     </div>

                     {/* Content */}
                     <div className="space-y-4">
                        <h3 className="text-xl font-bold text-text_color group-hover:text-primary transition-colors duration-300">
                           {item.title}
                        </h3>
                        <p className="text-gray-600 leading-relaxed">
                           {item.description}
                        </p>
                     </div>

                     {/* Hover indicator */}
                     <div className="mt-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="w-full h-1 bg-gradient-to-r from-primary to-secondary rounded-full"></div>
                     </div>
                  </div>
               ))}
            </div>
         </div>

         {/* Call to Action */}
         <div className="mt-16">
            <button className="bg-gradient-to-r from-primary to-secondary text-white px-8 py-4 rounded-full font-semibold text-lg hover:shadow-lg hover:scale-105 transition-all duration-300">
               Entre em Contato
            </button>
         </div>
      </section>
   );
};

export default HowToHelp;
