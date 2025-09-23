import CalendarCards from './CalendarCards';

const Calendar = () => {
   return (
      <section id="calendar" className="flex-col justify-items-center">
         <div className="flex-col mb-4 text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-text_color mb-4">
               Calendário
            </h1>
            <div className="w-24 h-1 bg-gradient-to-r from-primary to-secondary mx-auto mb-6"></div>
            <p className="text-xl text-primary font-light tracking-wide mb-12">
               Próximos Eventos
            </p>
         </div>
         <CalendarCards />
      </section>
   );
};

export default Calendar;
