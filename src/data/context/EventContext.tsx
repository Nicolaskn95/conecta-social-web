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
   resetFlags: () => void; // ✅ Adicionado para permitir reset manual
   addEvent: (event: IEvent) => void; // ✅ Adicionado para adicionar evento à lista
   updateEvent: (event: IEvent) => void; // ✅ Adicionado para atualizar evento na lista
   removeEvent: (eventId: string) => void; // ✅ Adicionado para remover evento da lista
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
   }, [get, token]); // ❌ Removido isLoading das dependências

   const publicEvents = useCallback(async () => {
      // Se já tem eventos carregados ou está carregando, não faz nova requisição
      if (events.length > 0 || isLoading || publicEventsCalled.current) {
         return; // Evita chamadas desnecessárias
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
   }, [get, events.length, isLoading]); // ✅ Adicionado events.length para evitar chamadas desnecessárias

   // Carrega eventos quando o token estiver disponível
   useEffect(() => {
      if (token && !loadEventCalled.current) {
         loadEvent();
      }
   }, [token]); // ❌ Removido loadEvent das dependências

   // Função para resetar os flags quando necessário
   const resetFlags = useCallback(() => {
      loadEventCalled.current = false;
      publicEventsCalled.current = false;
   }, []);

   // Função para adicionar um novo evento à lista
   const addEvent = useCallback((event: IEvent) => {
      setEvents(prevEvents => [event, ...prevEvents]);
   }, []);

   // Função para atualizar um evento na lista
   const updateEvent = useCallback((updatedEvent: IEvent) => {
      setEvents(prevEvents => 
         prevEvents.map(event => 
            event.id === updatedEvent.id ? updatedEvent : event
         )
      );
   }, []);

   // Função para remover um evento da lista
   const removeEvent = useCallback((eventId: string) => {
      setEvents(prevEvents => 
         prevEvents.filter(event => event.id !== eventId)
      );
   }, []);

   return (
      <EventContext.Provider
         value={{
            events,
            search,
            setSearch,
            loadEvent,
            publicEvents,
            isLoading,
            resetFlags, // ✅ Adicionado para permitir reset manual
            addEvent, // ✅ Adicionado para adicionar evento à lista
            updateEvent, // ✅ Adicionado para atualizar evento na lista
            removeEvent, // ✅ Adicionado para remover evento da lista
         }}
      >
         {props.children}
      </EventContext.Provider>
   );
}

export default EventContext;
