import CalendarCards from './CalendarCards';

const Calendar = () => {
   return (
      <section id="calendar" className="flex-col justify-items-center">
         <div className="flex-col mb-4 text-center">
            <h1 className="text-3xl mb-2">Calendário</h1>
            <p className="text-[#387AA1] text-xl">Próximos Eventos</p>
         </div>
         <CalendarCards />
      </section>
   );
};

export default Calendar;
