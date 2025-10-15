'use client';
import React, { useState } from 'react';
import DynamicMap from '@/components/Map/DynamicMap';
import { MapPin, Compass, Users, Calendar } from '@phosphor-icons/react';

// Dados mockados para o widget do dashboard
const dashboardEvents = [
   {
      id: '1',
      name: 'Distribuição de Alimentos',
      description: 'Distribuição de cestas básicas',
      date: '2024-08-15',
      location: {
         lat: -23.5505,
         lng: -46.6333,
         address: 'Praça da Sé, São Paulo - SP',
      },
      type: 'event' as const,
      participants: 25,
   },
   {
      id: '2',
      name: 'Campanha de Doações',
      description: 'Coleta de roupas e brinquedos',
      date: '2024-08-20',
      location: {
         lat: -23.5613,
         lng: -46.6565,
         address: 'Shopping Iguatemi, São Paulo - SP',
      },
      type: 'donation' as const,
      participants: 15,
   },
];

interface MapWidgetProps {
   className?: string;
}

const MapWidget: React.FC<MapWidgetProps> = ({ className = '' }) => {
   const [showUserLocation, setShowUserLocation] = useState(false);

   return (
      <div className={`bg-white rounded-lg shadow-md p-6 ${className}`}>
         <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
               <MapPin size={20} />
               Eventos no Mapa
            </h3>

            <div className="flex items-center gap-2">
               <input
                  type="checkbox"
                  id="showLocation"
                  checked={showUserLocation}
                  onChange={(e) => setShowUserLocation(e.target.checked)}
                  className="rounded border-gray-300"
               />
               <label htmlFor="showLocation" className="text-sm text-gray-600">
                  Minha localização
               </label>
            </div>
         </div>

         <DynamicMap
            events={dashboardEvents}
            showUserLocation={showUserLocation}
            center={[-23.5505, -46.6333]}
            zoom={11}
            height="300px"
            className="rounded-lg"
         />

         {/* Estatísticas rápidas */}
         <div className="mt-4 grid grid-cols-3 gap-4 text-center">
            <div>
               <div className="text-lg font-bold text-blue-600">
                  {dashboardEvents.length}
               </div>
               <div className="text-xs text-gray-600">Eventos Ativos</div>
            </div>
            <div>
               <div className="text-lg font-bold text-green-600">
                  {dashboardEvents.reduce(
                     (sum, event) => sum + (event.participants || 0),
                     0
                  )}
               </div>
               <div className="text-xs text-gray-600">Participantes</div>
            </div>
            <div>
               <div className="text-lg font-bold text-yellow-600">
                  {dashboardEvents.filter((e) => e.type === 'donation').length}
               </div>
               <div className="text-xs text-gray-600">Doações</div>
            </div>
         </div>
      </div>
   );
};

export default MapWidget;
