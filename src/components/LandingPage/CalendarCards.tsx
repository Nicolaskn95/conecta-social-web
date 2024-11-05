import { mockEvents } from "@/core/constants";
import { formatDate } from "@/utils/format";

export default function CalendarCards() {
  return (
    <>
      <div className="flex flex-col space-y-4">
        {mockEvents.map((event, index) => (
          <div className="card-effect" key={index}>
            <h1 className="text-lg font-bold">{event.title}</h1>
            <p className="text-sm text-gray-600">{formatDate(event.date)}</p>
            <p className="text-base text-gray-800 mt-2">{event.description}</p>
            <p className="mt-4 text-[#387AA1] hover:underline cursor-pointer">
              Clique para saber mais
            </p>
          </div>
        ))}
      </div>
    </>
  );
}
