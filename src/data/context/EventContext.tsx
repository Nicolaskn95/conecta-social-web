'use client';
import { createContext, useCallback, useState, useRef, useEffect } from 'react';
import useAPI from '../hooks/useAPI';
import useAuth from '../hooks/useAuth';
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
   const { token } = useAuth();
   const [search, setSearch] = useState<string>('');
   const [events, setEvents] = useState<IEvent[]>([]);
   const [isLoading, setIsLoading] = useState<boolean>(false);
   const publicEventsCalled = useRef<boolean>(false);
   const loadEventCalled = useRef<boolean>(false);

   const loadEvent = useCallback(async () => {
      if (isLoading || loadEventCalled.current) {
         return; // Evita chamadas simultâneas
      }

      // Verifica se o token está disponível antes de fazer a requisição
      if (!token) {
         return;
      }

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
   }, [get, isLoading, token]);

   const publicEvents = useCallback(async () => {
      if (isLoading || publicEventsCalled.current) {
         return; // Evita chamadas simultâneas
      }

      // Para publicEvents, não precisa de token (é público)
      publicEventsCalled.current = true;
      setIsLoading(true);
      try {
         const events = await get('/events/recent-with-instagram?limit=3', {
            noAuth: true,
         });
         setEvents(events.data ?? []);
      } catch (error) {
         console.error('Erro ao carregar eventos públicos:', error);
      } finally {
         setIsLoading(false);
      }
   }, [get, isLoading]);

   // Carrega eventos quando o token estiver disponível
   useEffect(() => {
      if (token && !loadEventCalled.current) {
         loadEvent();
      }
   }, [token, loadEvent]);

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
