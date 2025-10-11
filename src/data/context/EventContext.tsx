'use client';
import { createContext, useCallback, useState, useRef } from 'react';
import useAPI from '../hooks/useAPI';
import { IEvent } from '@/core/event';

export interface EventContextProps {
   events: IEvent[];
   search: string;
   setSearch: (search: string) => void;
   loadEvent: () => Promise<void>;
   publicEvents: () => Promise<void>;
   isLoading: boolean;
}

const EventContext = createContext<EventContextProps>({} as any);

export function EventProvider(props: any) {
   const { get } = useAPI();
   const [search, setSearch] = useState<string>('');
   const [events, setEvents] = useState<IEvent[]>([]);
   const [isLoading, setIsLoading] = useState<boolean>(false);
   const publicEventsCalled = useRef<boolean>(false);
   const loadEventCalled = useRef<boolean>(false);

   const loadEvent = useCallback(async () => {
      if (isLoading || loadEventCalled.current) return; // Evita chamadas simultâneas

      loadEventCalled.current = true;
      setIsLoading(true);
      try {
         const events = await get('/events/actives');
         setEvents(events.data ?? []);
      } catch (error) {
         console.error('Erro ao carregar eventos:', error);
      } finally {
         setIsLoading(false);
      }
   }, [get, isLoading]);

   const publicEvents = useCallback(async () => {
      if (isLoading || publicEventsCalled.current) {
         return; // Evita chamadas simultâneas
      }

      publicEventsCalled.current = true;
      setIsLoading(true);
      try {
         const events = await get('/events/recent-with-instagram?limit=3');
         setEvents(events.data ?? []);
      } catch (error) {
         console.error('Erro ao carregar eventos públicos:', error);
      } finally {
         setIsLoading(false);
      }
   }, [get, isLoading]);

   return (
      <EventContext.Provider
         value={{
            events,
            search,
            setSearch,
            loadEvent,
            publicEvents,
            isLoading,
         }}
      >
         {props.children}
      </EventContext.Provider>
   );
}

export default EventContext;
