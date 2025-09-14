'use client';
import React, { useEffect, useState } from 'react';
import useAPI from '@/data/hooks/useAPI';
import { instagramHTML } from '@/core/constants';
import EventsSkeleton from '../shared/EventsSkeleton';

const Events = () => {
   const { get } = useAPI();
   const [instagramEmbeds, setInstagramEmbeds] = useState<string[]>([]);
   const [loading, setLoading] = useState<boolean>(true);

   useEffect(() => {
      async function fetchEvents() {
         setLoading(true);
         try {
            // Get only active events for the landing page
            const response = await get('/events/recent-with-instagram?limit=3');
            // If your API returns { data: [...] }
            const events = response?.data || response || [];
            // Filter and map only events with embedded_instagram
            const embeds = events
               .filter((event: any) => !!event.embedded_instagram)
               .map((event: any) => event.embedded_instagram);
            setInstagramEmbeds(embeds);
         } catch (error) {
            setInstagramEmbeds([]);
         } finally {
            setLoading(false);
         }
      }
      fetchEvents();
   }, [get]);

   useEffect(() => {
      if (
         instagramEmbeds.length > 0 &&
         typeof window !== 'undefined' &&
         (window as any).instgrm &&
         (window as any).instgrm.Embeds &&
         typeof (window as any).instgrm.Embeds.process === 'function'
      ) {
         (window as any).instgrm.Embeds.process();
      }
   }, [instagramEmbeds]);

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
            {instagramEmbeds.length === 0 ? (
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
                  {instagramEmbeds.map((htmlString, index) => (
                     <div
                        className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                        key={index}
                        suppressHydrationWarning={false}
                        dangerouslySetInnerHTML={{ __html: htmlString }}
                     />
                  ))}
               </div>
            )}
         </div>
      </section>
   );

   return <EventsSkeleton isLoading={loading}>{pageContent}</EventsSkeleton>;
};

export default Events;
