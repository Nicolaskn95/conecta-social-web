'use client';
import { createContext, useCallback, useEffect, useState } from 'react';
import useAPI from '../hooks/useAPI';
import { IEvent } from '@/core/event';

export interface EventContextProps {
   events: IEvent[];
   search: string;
   setSearch: (search: string) => void;
   loadEvent: () => Promise<void>;
   publicEvents: () => Promise<void>;
}

const EventContext = createContext<EventContextProps>({} as any);

export function EventProvider(props: any) {
   const { get } = useAPI();
   const [search, setSearch] = useState<string>('');
   const [events, setEvents] = useState<IEvent[]>([]);

   const loadEvent = useCallback(async () => {
      const events = await get('/events/actives');
      // console.log(events);
      setEvents(events.data ?? []);
   }, [get]);

   const publicEvents = useCallback(async () => {
      const events = await get('/events/recent-with-instagram?limit=3');
      setEvents(events.data ?? []);
   }, [get]);

   return (
      <EventContext.Provider
         value={{
            events,
            search,
            setSearch,
            loadEvent,
            publicEvents,
         }}
      >
         {props.children}
      </EventContext.Provider>
   );
}

export default EventContext;
