import { mockEvents } from '@/core/constants';
import { formatDate } from '@/utils/format';

export default function CalendarCards() {
   return (
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
         {mockEvents.map((event, index) => (
            <div
               className="group bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer"
               key={index}
            >
               {/* Date Badge */}
               <div className="mb-4">
                  <div className="inline-flex items-center px-3 py-1 rounded-full bg-gradient-to-r from-primary/10 to-secondary/10 text-primary text-sm font-medium">
                     <svg
                        className="w-4 h-4 mr-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                     >
                        <path
                           strokeLinecap="round"
                           strokeLinejoin="round"
                           strokeWidth={2}
                           d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                     </svg>
                     {formatDate(event.date)}
                  </div>
               </div>

               {/* Event Content */}
               <div className="space-y-3">
                  <h3 className="text-xl font-bold text-text_color group-hover:text-primary transition-colors duration-300">
                     {event.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                     {event.description}
                  </p>
               </div>

               {/* Action Link */}
               <div className="mt-6 pt-4 border-t border-gray-100">
                  <div className="flex items-center text-primary font-medium group-hover:text-secondary transition-colors duration-300">
                     <span>Clique para saber mais</span>
                     <svg
                        className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform duration-300"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                     >
                        <path
                           strokeLinecap="round"
                           strokeLinejoin="round"
                           strokeWidth={2}
                           d="M9 5l7 7-7 7"
                        />
                     </svg>
                  </div>
               </div>
            </div>
         ))}
      </div>
   );
}
