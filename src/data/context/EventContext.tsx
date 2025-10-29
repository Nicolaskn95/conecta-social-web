'use client';
import { createContext, useState } from 'react';
import { IEvent } from '@/core/event';
import { useActiveEvents, usePublicEvents } from '../hooks/useEventQueries';
import { useEventMutations } from '../hooks/useEventMutations';
import useAuth from '../hooks/useAuth';

export interface EventContextProps {
   // Estados de busca
   search: string;
   setSearch: (search: string) => void;

   // Dados dos eventos
   events: IEvent[];
   publicEvents: IEvent[];

   // Estados de loading
   isLoading: boolean;
   isPublicLoading: boolean;

   // Funções de mutação
   addEvent: (event: IEvent) => void;
   updateEvent: (event: IEvent) => void;
   removeEvent: (eventId: string) => void;

   // Funções de refetch
   refetchEvents: () => void;
   refetchPublicEvents: () => void;
}

const EventContext = createContext<EventContextProps>({} as any);

export function EventProvider(props: any) {
   const { token } = useAuth();
   const [search, setSearch] = useState<string>('');

   // Hooks do React Query
   const {
      data: eventsData,
      isLoading,
      refetch: refetchEvents,
   } = useActiveEvents({ search }, { enabled: !!token });

   const {
      data: publicEventsData,
      isLoading: isPublicLoading,
      refetch: refetchPublicEvents,
   } = usePublicEvents(3);

   // Hooks de mutação
   const {
      createEvent,
      updateEvent: updateEventMutation,
      deleteEvent,
   } = useEventMutations();

   // Extrair dados dos eventos
   const events = eventsData?.data ?? [];
   const publicEvents = publicEventsData?.data ?? [];

   // Funções de mutação que usam React Query
   const addEvent = (event: IEvent) => {
      createEvent.mutate(event);
   };

   const updateEvent = (updatedEvent: IEvent) => {
      if (updatedEvent.id) {
         updateEventMutation.mutate({
            id: updatedEvent.id,
            event: updatedEvent,
         });
      }
   };

   const removeEvent = (eventId: string) => {
      deleteEvent.mutate(eventId);
   };

   return (
      <EventContext.Provider
         value={{
            search,
            setSearch,
            events,
            publicEvents,
            isLoading,
            isPublicLoading,
            addEvent,
            updateEvent,
            removeEvent,
            refetchEvents,
            refetchPublicEvents,
         }}
      >
         {props.children}
      </EventContext.Provider>
   );
}

export default EventContext;
