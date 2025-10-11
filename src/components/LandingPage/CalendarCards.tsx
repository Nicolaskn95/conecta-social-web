'use client';

import { useState, useEffect, useMemo, useCallback } from 'react';
import Calendar from 'react-calendar';
import { format, isSameDay, parseISO } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { useEvents } from '@/data/hooks/useEvents';
import 'react-calendar/dist/Calendar.css';
import CalendarSkeleton from '../shared/CalendarSkeleton';

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

export default function CalendarCards() {
   const [selectedDate, setSelectedDate] = useState<Date | null>(null);
   const [value, setValue] = useState<Value>(new Date());
   const { events, publicEvents, isLoading } = useEvents();

   // Carregar eventos quando o componente for montado (apenas uma vez)
   useEffect(() => {
      // Carrega apenas uma vez quando o componente monta
      publicEvents();
   }, []); // Array vazio = executa apenas uma vez

   // Função para verificar se uma data tem eventos (memoizada)
   const hasEvents = useCallback(
      (date: Date) => {
         return events.some((event) => {
            return isSameDay(date, event.date);
         });
      },
      [events]
   );

   // Função para obter eventos de uma data específica (memoizada)
   const getEventsForDate = useCallback(
      (date: Date) => {
         return events.filter((event) => {
            return isSameDay(date, event.date);
         });
      },
      [events]
   );

   // Função para renderizar o conteúdo do tile (cada dia do calendário) - memoizada
   const tileContent = useCallback(
      ({ date, view }: { date: Date; view: string }) => {
         if (view === 'month' && hasEvents(date)) {
            return (
               <div className="absolute top-0 right-0 w-3 h-3 bg-red-500 rounded-full z-10 pointer-events-none"></div>
            );
         }
         return null;
      },
      [hasEvents]
   );

   // Função para aplicar classes CSS aos tiles - memoizada
   const tileClassName = useCallback(
      ({ date, view }: { date: Date; view: string }) => {
         if (view === 'month' && hasEvents(date)) {
            return 'has-events';
         }
         return '';
      },
      [hasEvents]
   );

   const handleDateChange = useCallback((nextValue: Value) => {
      setValue(nextValue);
      if (nextValue instanceof Date) {
         setSelectedDate(nextValue);
      }
   }, []);

   const selectedEvents = useMemo(() => {
      return selectedDate ? getEventsForDate(selectedDate) : [];
   }, [selectedDate, getEventsForDate]);

   const pageContent = (
      <div className="w-full max-w-6xl mx-auto">
         <div className="flex flex-col lg:flex-row gap-8">
            {/* Calendário */}
            <div className="w-full lg:w-[400px] lg:flex-shrink-0 justify-items-center">
               <Calendar
                  onChange={handleDateChange}
                  value={value}
                  tileContent={tileContent}
                  tileClassName={tileClassName}
                  locale="pt-BR"
                  className="custom-calendar"
                  minDate={new Date()}
                  maxDate={new Date(new Date().getFullYear() + 1, 11, 31)}
               />
            </div>

            {/* Painel de eventos do dia selecionado */}
            <div className="w-full lg:flex-1 lg:min-w-0">
               <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 min-h-[400px] flex flex-col">
                  <h3 className="text-xl font-bold text-text_color mb-4">
                     {selectedDate ? (
                        <>
                           Eventos de{' '}
                           {format(selectedDate, "dd 'de' MMMM 'de' yyyy", {
                              locale: ptBR,
                           })}
                        </>
                     ) : (
                        'Selecione uma data para ver os eventos'
                     )}
                  </h3>

                  <div className="flex-1 flex flex-col">
                     {selectedDate && selectedEvents.length === 0 && (
                        <div className="flex-1 flex items-center justify-center">
                           <p className="text-gray-500 italic text-center">
                              Nenhum evento programado para esta data.
                           </p>
                        </div>
                     )}

                     {!selectedDate && (
                        <div className="flex-1 flex items-center justify-center">
                           <p className="text-gray-500 italic text-center">
                              Selecione uma data no calendário para ver os
                              eventos.
                           </p>
                        </div>
                     )}

                     <div className="space-y-4">
                        {selectedEvents.map((event, index) => (
                           <div
                              key={event.id || index}
                              className="p-4 bg-gradient-to-r from-primary/5 to-secondary/5 rounded-lg border border-primary/20"
                           >
                              <div className="flex items-start justify-between">
                                 <div className="flex-1">
                                    <h4 className="font-semibold text-lg text-text_color mb-2">
                                       {event.name}
                                    </h4>
                                    <p className="text-gray-600 text-sm mb-2">
                                       {event.description}
                                    </p>
                                    <div className="flex items-center text-sm text-gray-500">
                                       <svg
                                          className="w-4 h-4 mr-1"
                                          fill="none"
                                          stroke="currentColor"
                                          viewBox="0 0 24 24"
                                       >
                                          <path
                                             strokeLinecap="round"
                                             strokeLinejoin="round"
                                             strokeWidth={2}
                                             d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                                          />
                                          <path
                                             strokeLinecap="round"
                                             strokeLinejoin="round"
                                             strokeWidth={2}
                                             d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                                          />
                                       </svg>
                                       {event.street}, {event.number} -{' '}
                                       {event.neighborhood}, {event.city}
                                    </div>
                                 </div>
                                 <div className="ml-4">
                                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary">
                                       {event.status}
                                    </span>
                                 </div>
                              </div>
                           </div>
                        ))}
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );

   return (
      <CalendarSkeleton isLoading={isLoading}>{pageContent}</CalendarSkeleton>
   );
}
