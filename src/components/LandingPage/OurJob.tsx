import React from 'react';

function OurJob() {
   return (
      <article id="our-job" className="text-center max-w-4xl mx-auto">
         {/* Section Header */}
         <div className="mb-16">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-text_color mb-4">
               Nosso Trabalho
            </h1>
            <div className="w-24 h-1 bg-gradient-to-r from-primary to-secondary mx-auto mb-6"></div>
            <p className="text-xl text-primary font-light tracking-wide">
               Transformando vidas através da solidariedade
            </p>
         </div>

         {/* Content */}
         <div className="space-y-8 text-lg leading-relaxed">
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
               <p className="text-text_color">
                  Nosso propósito é transformar vidas por meio da solidariedade.
                  Acreditamos que todas as crianças merecem oportunidades para
                  um futuro brilhante e feliz, independentemente de sua condição
                  social. Aqui, unimos esforços para oferecer apoio educacional,
                  cultural e emocional a crianças em situação de
                  vulnerabilidade.
               </p>
               <p className="text-text_color">
                  Junte-se a nós nesta missão de esperança! Cada contribuição,
                  seja voluntariado, doação ou apoio, faz uma diferença real na
                  vida de cada criança. Vamos construir juntos um caminho de
                  inclusão e desenvolvimento.
               </p>
            </div>
         </div>
      </article>
   );
}

export default OurJob;
