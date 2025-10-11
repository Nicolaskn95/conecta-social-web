'use client';
import React, { useEffect } from 'react';
import EventsSkeleton from '../shared/EventsSkeleton';
import { useEvents } from '@/data/hooks/useEvents';

const Events = () => {
   const { publicEvents, events, isLoading } = useEvents();

   useEffect(() => {
      // Carrega apenas uma vez quando o componente monta
      publicEvents();
   }, []); // Array vazio = executa apenas uma vez

   useEffect(() => {
      if (
         events.length > 0 &&
         typeof window !== 'undefined' &&
         (window as any).instgrm &&
         (window as any).instgrm.Embeds &&
         typeof (window as any).instgrm.Embeds.process === 'function'
      ) {
         (window as any).instgrm.Embeds.process();
      }
   }, [events]);

   const pageContent = (
      <section id="events" className="text-center">
         {/* Section Header */}
         <div className="mb-16">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-text_color mb-4">
               Eventos
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-primary to-secondary mx-auto mb-6"></div>
            <p className="text-xl text-primary font-light tracking-wide">
               Últimos Eventos
            </p>
         </div>

         {/* Events Content */}
         <div className="max-w-6xl mx-auto">
            {events.length === 0 ? (
               <div className="bg-white rounded-2xl p-12 shadow-lg border border-gray-100">
                  <div className="text-center">
                     <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg
                           className="w-8 h-8 text-gray-400"
                           fill="none"
                           stroke="currentColor"
                           viewBox="0 0 24 24"
                        >
                           <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                           />
                        </svg>
                     </div>
                     <h3 className="text-xl font-semibold text-text_color mb-2">
                        Nenhum evento encontrado
                     </h3>
                     <p className="text-gray-600">
                        Em breve teremos novos eventos para você!
                     </p>
                  </div>
               </div>
            ) : (
               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {events
                     .filter((event) => event.embedded_instagram) // Filtra apenas eventos com Instagram
                     .map((event, index) => (
                        <div
                           className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                           key={event.id || index}
                           suppressHydrationWarning={true}
                           dangerouslySetInnerHTML={{
                              __html: event.embedded_instagram!,
                           }}
                        />
                     ))}
               </div>
            )}
         </div>
      </section>
   );

   return <EventsSkeleton isLoading={isLoading}>{pageContent}</EventsSkeleton>;
};

export default Events;
