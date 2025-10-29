import { useContext } from 'react';
import EventContext from '../context/EventContext';

const useEvents = () => {
   const context = useContext(EventContext);
   return context;
};

export { useEvents };
