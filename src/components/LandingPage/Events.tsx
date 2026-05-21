'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { format, parseISO } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import EventsSkeleton from '../shared/EventsSkeleton';
import { SkeletonBox } from '../shared/SkeletonElements';
import { usePublicEvents } from '@/data/hooks/useEventQueries';
import { IEvent } from '@/core/event';

const EMBED_LOAD_TIMEOUT_MS = 15_000;
const EMBED_POLL_INTERVAL_MS = 200;
const EMBED_STABLE_CHECKS_REQUIRED = 3;
const INSTAGRAM_EMBED_HEIGHT_PX = 480;
const MIN_LOADED_IFRAME_HEIGHT_PX = 250;
const MIN_LOADED_IFRAME_WIDTH_PX = 200;

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

function getInstagramIframe(container: HTMLElement): HTMLIFrameElement | null {
   return container.querySelector('iframe');
}

function isInstagramIframePopulated(iframe: HTMLIFrameElement): boolean {
   const src = iframe.getAttribute('src') ?? '';
   return src.length > 0 && src !== 'about:blank';
}

function isInstagramPostFullyRendered(container: HTMLElement): boolean {
   const iframe = getInstagramIframe(container);
   if (!iframe || !isInstagramIframePopulated(iframe)) return false;

   const { offsetHeight, offsetWidth } = iframe;
   return (
      offsetHeight >= MIN_LOADED_IFRAME_HEIGHT_PX &&
      offsetWidth >= MIN_LOADED_IFRAME_WIDTH_PX
   );
}

function useInstagramPostLoaded(
   embedHtml: string | undefined,
   container: HTMLDivElement | null
) {
   const [isPostLoaded, setIsPostLoaded] = useState(!embedHtml);

   useEffect(() => {
      if (!embedHtml) {
         setIsPostLoaded(true);
         return;
      }

      if (!container) return;

      setIsPostLoaded(false);

      let disposed = false;
      let pollId: ReturnType<typeof setInterval> | undefined;
      let timeoutId: ReturnType<typeof setTimeout> | undefined;
      let observer: MutationObserver | undefined;
      let iframeLoadHandler: (() => void) | null = null;
      let boundIframe: HTMLIFrameElement | null = null;
      let lastMeasuredHeight = 0;
      let stableChecks = 0;
      let hasIframeLoaded = false;

      const getContainer = () => container;

      const cleanup = () => {
         observer?.disconnect();
         if (pollId) clearInterval(pollId);
         if (timeoutId) clearTimeout(timeoutId);
         if (boundIframe && iframeLoadHandler) {
            boundIframe.removeEventListener('load', iframeLoadHandler);
         }
         boundIframe = null;
         iframeLoadHandler = null;
      };

      const markLoaded = () => {
         const container = getContainer();
         if (disposed || !container) return;

         disposed = true;
         cleanup();
         setIsPostLoaded(true);
      };

      const bindIframeLoad = (iframe: HTMLIFrameElement) => {
         if (boundIframe === iframe) return;

         if (boundIframe && iframeLoadHandler) {
            boundIframe.removeEventListener('load', iframeLoadHandler);
         }

         boundIframe = iframe;
         iframeLoadHandler = () => {
            hasIframeLoaded = true;
            stableChecks = 0;
            lastMeasuredHeight = 0;
         };
         iframe.addEventListener('load', iframeLoadHandler);

         if (
            isInstagramIframePopulated(iframe) &&
            iframe.offsetHeight >= MIN_LOADED_IFRAME_HEIGHT_PX
         ) {
            hasIframeLoaded = true;
         }
      };

      const tryDetectCompleteLoad = () => {
         const container = getContainer();
         if (!container) return;

         if (!isInstagramPostFullyRendered(container)) {
            stableChecks = 0;
            lastMeasuredHeight = 0;
            return;
         }

         const iframe = getInstagramIframe(container)!;
         bindIframeLoad(iframe);

         if (!hasIframeLoaded) return;

         const currentHeight = iframe.offsetHeight;
         if (
            currentHeight === lastMeasuredHeight &&
            currentHeight >= MIN_LOADED_IFRAME_HEIGHT_PX
         ) {
            stableChecks += 1;
         } else {
            stableChecks = 0;
            lastMeasuredHeight = currentHeight;
         }

         if (stableChecks >= EMBED_STABLE_CHECKS_REQUIRED) {
            markLoaded();
         }
      };

      const setup = async () => {
         await waitForInstagramScript();
         if (disposed || !getContainer()) return;

         processInstagramEmbeds();
         tryDetectCompleteLoad();

         const container = getContainer();
         if (!container) return;

         observer = new MutationObserver(tryDetectCompleteLoad);
         observer.observe(container, { childList: true, subtree: true });

         pollId = setInterval(tryDetectCompleteLoad, EMBED_POLL_INTERVAL_MS);
         timeoutId = setTimeout(markLoaded, EMBED_LOAD_TIMEOUT_MS);
      };

      setup();

      return () => {
         disposed = true;
         cleanup();
      };
   }, [embedHtml, container]);

   return isPostLoaded;
}

function InstagramPostLoading({ delay = 0 }: { delay?: number }) {
   return (
      <div
         className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-4 bg-gray-50/95 px-6"
         role="status"
         aria-live="polite"
         aria-label="Carregando publicação do Instagram"
      >
         <div className="h-11 w-11 animate-spin rounded-full border-4 border-primary/20 border-t-primary" />
         <p className="text-sm font-medium text-gray-500">
            Carregando publicação...
         </p>
         <div className="w-full max-w-xs space-y-3">
            <div className="flex items-center gap-3">
               <SkeletonBox
                  width="w-10"
                  height="h-10"
                  className="rounded-full"
                  delay={delay}
               />
               <div className="flex-1 space-y-2">
                  <SkeletonBox width="w-28" height="h-3" delay={delay + 80} />
                  <SkeletonBox width="w-20" height="h-3" delay={delay + 160} />
               </div>
            </div>
            <SkeletonBox
               width="w-full"
               height="h-48"
               className="rounded-xl"
               delay={delay + 240}
            />
         </div>
      </div>
   );
}

function EventCard({ event, index }: { event: IEvent; index: number }) {
   const [embedEl, setEmbedEl] = useState<HTMLDivElement | null>(null);

   const isPostLoaded = useInstagramPostLoaded(
      event.embedded_instagram,
      embedEl
   );

   useEffect(() => {
      if (!isPostLoaded) return;
      processInstagramEmbeds();
   }, [isPostLoaded]);

   const eventDate = parseEventDate(event.date);
   const { day, month, year, fullLabel, weekday } =
      formatEventDateParts(eventDate);

   const loadingDelay = index * 120;

   return (
      <article className="flex h-full min-h-0 flex-col">
         <div className="group flex h-full min-h-0 flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
            <div className="relative shrink-0 overflow-hidden bg-gradient-to-br from-tertiary/40 via-white to-primary/5 px-6 pb-5 pt-6">
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
                     <p className="mb-1 text-xs font-medium uppercase tracking-wider text-secondary">
                        {weekday}
                     </p>
                     <h3 className="line-clamp-2 text-xl font-bold leading-snug text-primary transition-colors duration-300 group-hover:text-secondary md:text-2xl">
                        {event.name}
                     </h3>
                  </div>
               </div>
            </div>

            {event.embedded_instagram && (
               <div
                  className="event-instagram-embed relative shrink-0 border-t border-gray-100 bg-gray-50/50"
                  style={
                     {
                        '--event-instagram-embed-height': `${INSTAGRAM_EMBED_HEIGHT_PX}px`,
                     } as React.CSSProperties
                  }
               >
                  {!isPostLoaded && (
                     <InstagramPostLoading delay={loadingDelay} />
                  )}

                  <div
                     ref={setEmbedEl}
                     className={`event-instagram-embed__inner w-full transition-opacity duration-500 ${
                        isPostLoaded ? 'opacity-100' : 'opacity-0'
                     }`}
                     suppressHydrationWarning
                     dangerouslySetInnerHTML={{
                        __html: event.embedded_instagram,
                     }}
                  />
               </div>
            )}
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
