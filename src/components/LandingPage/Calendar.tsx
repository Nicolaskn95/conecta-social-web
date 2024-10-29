import CalendarCards from "./CalendarCards";

const Calendar = () => {
  return (
    <div className="flex-col justify-items-center">
      <div className="flex-col mb-4 text-center">
        <h1 className="text-3xl mb-2">Calendário</h1>
        <p className="text-[#387AA1] text-xl">Próximos Eventos</p>
      </div>
      <CalendarCards />
    </div>
  );
};

export default Calendar;
