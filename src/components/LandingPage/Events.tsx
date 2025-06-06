'use client';
import React, { useEffect, useState } from 'react';
import useAPI from '@/data/hooks/useAPI';
import { instagramHTML } from '@/core/constants';

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

   return (
      <section id="events" className="flex flex-col justify-items-center my-12">
         <div className="flex flex-col mb-4 text-center">
            <h1 className="text-3xl mb-2">Eventos</h1>
            <p className="text-[#387AA1] text-xl">Últimos Eventos</p>
         </div>
         <div className="flex flex-wrap justify-center md:gap-16 lg:gap-32 md:flex-col lg:flex-row">
            {loading ? (
               <p>Carregando eventos...</p>
            ) : instagramEmbeds.length === 0 ? (
               <p>Nenhum evento encontrado.</p>
            ) : (
               instagramEmbeds.map(async (htmlString, index) => (
                  <div
                     className="mb-6"
                     key={index}
                     suppressHydrationWarning={false}
                     dangerouslySetInnerHTML={{ __html: htmlString }}
                  />
               ))
            )}
         </div>
      </section>
   );
};

export default Events;
