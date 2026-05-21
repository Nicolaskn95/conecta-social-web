'use client';

import React, { useEffect, useMemo, useRef, useState } from 'react';
import { format, parseISO } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import EventsSkeleton from '../shared/EventsSkeleton';
import { SkeletonBox } from '../shared/SkeletonElements';
import { usePublicEvents } from '@/data/hooks/useEventQueries';
import { IEvent } from '@/core/event';

const EMBED_LOAD_TIMEOUT_MS = 12_000;
const EMBED_POLL_INTERVAL_MS = 200;
const INSTAGRAM_EMBED_HEIGHT_PX = 420;

function parseEventDate(date: IEvent['date']): Date {
   return typeof date === 'string' ? parseISO(date) : new Date(date);
}

function formatEventDateParts(date: Date) {
   const weekday = format(date, 'EEEE', { locale: ptBR });
   const capitalizedWeekday =
      weekday.charAt(0).toUpperCase() + weekday.slice(1);

   return {
      day: format(date, 'dd', { locale: ptBR }),
      month: format(date, 'MMM', { locale: ptBR })
         .replace('.', '')
         .toUpperCase(),
      year: format(date, 'yyyy', { locale: ptBR }),
      fullLabel: format(date, "dd 'de' MMMM 'de' yyyy", { locale: ptBR }),
      weekday: capitalizedWeekday,
   };
}

function processInstagramEmbeds() {
   const instgrm = (
      window as Window & { instgrm?: { Embeds?: { process: () => void } } }
   ).instgrm;
   instgrm?.Embeds?.process?.();
}

function waitForInstagramScript(maxWaitMs = 8000): Promise<void> {
   return new Promise((resolve) => {
      if (
         (window as Window & { instgrm?: { Embeds?: { process: () => void } } })
            .instgrm?.Embeds?.process
      ) {
         resolve();
         return;
      }

      const startedAt = Date.now();
      const interval = setInterval(() => {
         if (
            (
               window as Window & {
                  instgrm?: { Embeds?: { process: () => void } };
               }
            ).instgrm?.Embeds?.process
         ) {
            clearInterval(interval);
            resolve();
            return;
         }

         if (Date.now() - startedAt >= maxWaitMs) {
            clearInterval(interval);
            resolve();
         }
      }, 100);
   });
}

function isInstagramEmbedRendered(container: HTMLElement): boolean {
   const iframe = container.querySelector('iframe');
   return Boolean(iframe && iframe.offsetHeight > 80);
}

function useInstagramEmbedReady(
   embedHtml: string | undefined,
   containerRef: React.RefObject<HTMLDivElement | null>
) {
   const [isReady, setIsReady] = useState(false);

   useEffect(() => {
      if (!embedHtml) {
         setIsReady(true);
         return;
      }

      setIsReady(false);
      const container = containerRef.current;
      if (!container) return;

      let disposed = false;
      let pollId: ReturnType<typeof setInterval> | undefined;
      let timeoutId: ReturnType<typeof setTimeout> | undefined;
      let observer: MutationObserver | undefined;

      const markReady = () => {
         if (disposed) return;
         disposed = true;
         observer?.disconnect();
         if (pollId) clearInterval(pollId);
         if (timeoutId) clearTimeout(timeoutId);
         setIsReady(true);
      };

      const tryDetectEmbed = () => {
         if (isInstagramEmbedRendered(container)) {
            markReady();
         }
      };

      const setup = async () => {
         await waitForInstagramScript();
         if (disposed) return;

         processInstagramEmbeds();
         tryDetectEmbed();

         observer = new MutationObserver(tryDetectEmbed);
         observer.observe(container, { childList: true, subtree: true });

         pollId = setInterval(tryDetectEmbed, EMBED_POLL_INTERVAL_MS);
         timeoutId = setTimeout(markReady, EMBED_LOAD_TIMEOUT_MS);

         const iframe = container.querySelector('iframe');
         iframe?.addEventListener('load', markReady, { once: true });
      };

      setup();

      return () => {
         disposed = true;
         observer?.disconnect();
         if (pollId) clearInterval(pollId);
         if (timeoutId) clearTimeout(timeoutId);
      };
   }, [embedHtml, containerRef]);

   return isReady;
}

function EventCardSkeleton({ delay = 0 }: { delay?: number }) {
   return (
      <div
         className="flex h-full min-h-0 flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-lg"
         aria-hidden
      >
         <div className="bg-gradient-to-br from-tertiary/40 via-white to-primary/5 px-6 pb-5 pt-6">
            <div className="flex items-start gap-4">
               <SkeletonBox
                  width="w-[72px]"
                  height="h-[88px]"
                  className="shrink-0 rounded-2xl"
                  delay={delay}
               />
               <div className="min-w-0 flex-1 space-y-3 pt-1">
                  <SkeletonBox width="w-24" height="h-3" delay={delay + 80} />
                  <SkeletonBox
                     width="w-full"
                     height="h-7"
                     delay={delay + 160}
                  />
                  <SkeletonBox width="w-4/5" height="h-7" delay={delay + 240} />
                  <SkeletonBox width="w-3/5" height="h-4" delay={delay + 320} />
               </div>
            </div>
         </div>

         <div className="flex flex-1 flex-col border-t border-gray-100 bg-gray-50/50 p-4">
            <div className="mb-4 flex items-center gap-3">
               <SkeletonBox
                  width="w-10"
                  height="h-10"
                  className="rounded-full"
                  delay={delay + 400}
               />
               <div className="flex-1 space-y-2">
                  <SkeletonBox width="w-28" height="h-4" delay={delay + 480} />
                  <SkeletonBox width="w-20" height="h-3" delay={delay + 560} />
               </div>
            </div>
            <SkeletonBox
               width="w-full"
               height="h-[420px]"
               className="shrink-0 rounded-xl"
               delay={delay + 640}
            />
            <div className="mt-4 flex gap-3">
               <SkeletonBox width="w-6" height="h-6" delay={delay + 720} />
               <SkeletonBox width="w-6" height="h-6" delay={delay + 800} />
               <SkeletonBox width="w-6" height="h-6" delay={delay + 880} />
            </div>
         </div>
      </div>
   );
}

function EventCard({ event, index }: { event: IEvent; index: number }) {
   const embedRef = useRef<HTMLDivElement>(null);
   const isEmbedReady = useInstagramEmbedReady(
      event.embedded_instagram,
      embedRef
   );

   const eventDate = parseEventDate(event.date);
   const { day, month, year, fullLabel, weekday } =
      formatEventDateParts(eventDate);

   const skeletonDelay = index * 120;

   return (
      <article className="relative flex h-full min-h-0 flex-col">
         {!isEmbedReady && (
            <div className="relative z-10 h-full">
               <EventCardSkeleton delay={skeletonDelay} />
            </div>
         )}

         <div
            className={`flex h-full min-h-0 flex-col transition-opacity duration-500 ${
               isEmbedReady
                  ? 'opacity-100'
                  : 'pointer-events-none absolute inset-0 opacity-0'
            }`}
            aria-hidden={!isEmbedReady}
         >
            <div className="group flex h-full min-h-0 flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
               <div className="relative overflow-hidden bg-gradient-to-br from-tertiary/40 via-white to-primary/5 px-6 pb-5 pt-6">
                  <div className="pointer-events-none absolute -right-6 -top-6 h-28 w-28 rounded-full bg-secondary/20 blur-2xl transition-transform duration-500 group-hover:scale-110" />
                  <div className="pointer-events-none absolute -bottom-8 -left-4 h-20 w-20 rounded-full bg-tertiary/50 blur-xl" />

                  <div className="relative flex items-start gap-4">
                     <div
                        className="flex shrink-0 flex-col items-center justify-center rounded-2xl border border-primary/20 bg-header_sidebar_color px-4 py-3 shadow-sm backdrop-blur-sm"
                        aria-hidden
                     >
                        <div className="text-3xl font-bold leading-none tracking-tight text-primary">
                           {day}
                        </div>
                        <div className="mt-1 text-xs font-semibold tracking-widest text-secondary">
                           {month}
                        </div>
                        <div className="mt-0.5 text-[10px] font-medium text-gray-400">
                           {year}
                        </div>
                     </div>

                     <div className="min-w-0 flex-1 pt-1 text-left">
                        <p className="mb-1 text-xs font-medium uppercase tracking-wider text-secondary underline">
                           {weekday}
                        </p>
                        <h3 className="line-clamp-2 text-xl font-bold leading-snug text-primary transition-colors duration-300 group-hover:text-secondary md:text-2xl">
                           {event.name}
                        </h3>
                        <p className="mt-2 flex items-center gap-1.5 text-sm text-gray-500"></p>
                     </div>
                  </div>
               </div>

               {event.embedded_instagram && (
                  <div
                     ref={embedRef}
                     className="event-instagram-embed shrink-0 border-t border-gray-100 bg-gray-50/50"
                     style={
                        {
                           '--event-instagram-embed-height': `${INSTAGRAM_EMBED_HEIGHT_PX}px`,
                        } as React.CSSProperties
                     }
                     suppressHydrationWarning
                     dangerouslySetInnerHTML={{
                        __html: event.embedded_instagram,
                     }}
                  />
               )}
            </div>
         </div>
      </article>
   );
}

const Events = () => {
   const { data: publicEventsData, isLoading: isPublicLoading } =
      usePublicEvents(3);
   const publicEvents = useMemo(
      () =>
         publicEventsData?.data?.filter((event) => event.embedded_instagram) ??
         [],
      [publicEventsData?.data]
   );

   const pageContent = (
      <section id="events" className="text-center">
         <div className="mb-16">
            <h2 className="mb-4 text-4xl font-bold text-text_color md:text-5xl lg:text-6xl">
               Eventos
            </h2>
            <div className="mx-auto mb-6 h-1 w-24 bg-gradient-to-r from-primary to-secondary" />
            <p className="text-xl font-light tracking-wide text-primary">
               Últimos Eventos
            </p>
         </div>

         <div className="mx-auto max-w-6xl">
            {publicEvents.length === 0 ? (
               <div className="rounded-2xl border border-gray-100 bg-white p-12 shadow-lg">
                  <div className="text-center">
                     <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gray-100">
                        <svg
                           className="h-8 w-8 text-gray-400"
                           fill="none"
                           stroke="currentColor"
                           viewBox="0 0 24 24"
                        >
                           <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                           />
                        </svg>
                     </div>
                     <h3 className="mb-2 text-xl font-semibold text-text_color">
                        Nenhum evento encontrado
                     </h3>
                     <p className="text-gray-600">
                        Em breve teremos novos eventos para você!
                     </p>
                  </div>
               </div>
            ) : (
               <div className="grid grid-cols-1 items-stretch gap-8 md:grid-cols-2 lg:grid-cols-3">
                  {publicEvents.map((event, index) => (
                     <EventCard
                        key={event.id || index}
                        event={event}
                        index={index}
                     />
                  ))}
               </div>
            )}
         </div>
      </section>
   );

   return (
      <EventsSkeleton isLoading={isPublicLoading}>{pageContent}</EventsSkeleton>
   );
};

export default Events;
