import { useContext } from 'react';
import EventContext from '../context/EventContext';

const useEvents = () => useContext(EventContext);

export { useEvents };
