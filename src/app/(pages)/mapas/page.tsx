'use client';
import React, { useState } from 'react';
import DynamicMap from '@/components/Map/DynamicMap';
import {
   MapPin,
   Compass,
   Users,
   Calendar,
   FunnelSimple,
   Heart,
} from '@phosphor-icons/react';

// Dados mockados para a página pública
const publicEvents = [
   {
      id: '1',
      name: 'Distribuição de Alimentos',
      description: 'Distribuição de cestas básicas para famílias carentes',
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
      description: 'Coleta de roupas e brinquedos para crianças',
      date: '2024-08-20',
      location: {
         lat: -23.5613,
         lng: -46.6565,
         address: 'Shopping Iguatemi, São Paulo - SP',
      },
      type: 'donation' as const,
      participants: 15,
   },
   {
      id: '3',
      name: 'Voluntariado - Limpeza',
      description: 'Ação de limpeza no parque da cidade',
      date: '2024-08-25',
      location: {
         lat: -23.5489,
         lng: -46.6388,
         address: 'Parque Ibirapuera, São Paulo - SP',
      },
      type: 'volunteer' as const,
      participants: 30,
   },
];

const publicRoutes = [
   {
      id: '1',
      name: 'Rota de Distribuição',
      coordinates: [
         [-23.5505, -46.6333], // Praça da Sé
         [-23.5613, -46.6565], // Shopping Iguatemi
         [-23.5489, -46.6388], // Parque Ibirapuera
      ],
      color: '#3B82F6',
      description: 'Rota otimizada para distribuição de alimentos',
   },
];

function MapasPage() {
   const [showUserLocation, setShowUserLocation] = useState(false);
   const [filterType, setFilterType] = useState<string>('all');

   const filteredEvents = publicEvents.filter(
      (event) => filterType === 'all' || event.type === filterType
   );

   const getEventTypeColor = (type: string) => {
      switch (type) {
         case 'event':
            return 'bg-blue-100 text-blue-800';
         case 'donation':
            return 'bg-green-100 text-green-800';
         case 'volunteer':
            return 'bg-yellow-100 text-yellow-800';
         default:
            return 'bg-gray-100 text-gray-800';
      }
   };

   const getEventTypeLabel = (type: string) => {
      switch (type) {
         case 'event':
            return 'Evento';
         case 'donation':
            return 'Doação';
         case 'volunteer':
            return 'Voluntariado';
         default:
            return 'Outro';
      }
   };

   return (
      <div className="min-h-screen bg-gray-50">
         {/* Hero Section */}
         <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
            <div className="max-w-7xl mx-auto px-4">
               <div className="text-center">
                  <h1 className="text-4xl font-bold mb-4 flex items-center justify-center gap-3">
                     <MapPin size={40} />
                     Nossos Eventos no Mapa
                  </h1>
                  <p className="text-xl text-blue-100 max-w-3xl mx-auto">
                     Acompanhe em tempo real onde estamos atuando e como você
                     pode participar das nossas ações sociais em São Paulo.
                  </p>
               </div>
            </div>
         </div>

         <div className="max-w-7xl mx-auto px-4 py-8">
            {/* Controles */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
               <div className="flex flex-wrap items-center gap-6">
                  <div className="flex items-center gap-2">
                     <FunnelSimple size={20} className="text-gray-600" />
                     <span className="text-sm font-medium text-gray-700">
                        Filtrar por tipo:
                     </span>
                  </div>

                  <select
                     value={filterType}
                     onChange={(e) => setFilterType(e.target.value)}
                     className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                     <option value="all">Todos os Eventos</option>
                     <option value="event">Eventos</option>
                     <option value="donation">Doações</option>
                     <option value="volunteer">Voluntariado</option>
                  </select>

                  <div className="flex items-center gap-2">
                     <input
                        type="checkbox"
                        id="showUserLocation"
                        checked={showUserLocation}
                        onChange={(e) => setShowUserLocation(e.target.checked)}
                        className="rounded border-gray-300"
                     />
                     <label
                        htmlFor="showUserLocation"
                        className="text-sm text-gray-700"
                     >
                        Mostrar minha localização
                     </label>
                  </div>
               </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
               {/* Lista de Eventos */}
               <div className="lg:col-span-1">
                  <div className="bg-white rounded-lg shadow-md p-6 sticky top-4">
                     <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
                        <Calendar size={24} />
                        Próximos Eventos ({filteredEvents.length})
                     </h2>

                     <div className="space-y-4 max-h-96 overflow-y-auto">
                        {filteredEvents.map((event) => (
                           <div
                              key={event.id}
                              className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                           >
                              <div className="flex items-start justify-between mb-3">
                                 <h3 className="font-semibold text-gray-800">
                                    {event.name}
                                 </h3>
                                 <span
                                    className={`px-2 py-1 rounded-full text-xs font-medium ${getEventTypeColor(
                                       event.type
                                    )}`}
                                 >
                                    {getEventTypeLabel(event.type)}
                                 </span>
                              </div>

                              <p className="text-sm text-gray-600 mb-3">
                                 {event.description}
                              </p>

                              <div className="space-y-2 text-xs text-gray-500">
                                 <div className="flex items-center gap-2">
                                    <Calendar size={14} />
                                    {new Date(event.date).toLocaleDateString(
                                       'pt-BR'
                                    )}
                                 </div>
                                 <div className="flex items-center gap-2">
                                    <Users size={14} />
                                    {event.participants} participantes
                                 </div>
                                 <div className="flex items-center gap-2">
                                    <MapPin size={14} />
                                    {event.location.address}
                                 </div>
                              </div>
                           </div>
                        ))}
                     </div>

                     {/* Call to Action */}
                     <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                        <h3 className="font-semibold text-blue-800 mb-2">
                           Quer Participar?
                        </h3>
                        <p className="text-sm text-blue-700 mb-3">
                           Entre em contato conosco para saber como participar
                           dos nossos eventos.
                        </p>
                        <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors flex items-center justify-center gap-2">
                           <Heart size={16} />
                           Fazer Doação
                        </button>
                     </div>
                  </div>
               </div>

               {/* Mapa */}
               <div className="lg:col-span-2">
                  <div className="bg-white rounded-lg shadow-md p-6">
                     <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
                        <MapPin size={24} />
                        Mapa Interativo
                     </h2>

                     <DynamicMap
                        events={filteredEvents}
                        routes={publicRoutes}
                        showUserLocation={showUserLocation}
                        center={[-23.5505, -46.6333]}
                        zoom={12}
                        height="600px"
                        className="rounded-lg"
                     />

                     {/* Legenda */}
                     <div className="mt-6 flex flex-wrap gap-6 text-sm">
                        <div className="flex items-center gap-2">
                           <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
                           <span>Eventos</span>
                        </div>
                        <div className="flex items-center gap-2">
                           <div className="w-4 h-4 bg-green-500 rounded-full"></div>
                           <span>Doações</span>
                        </div>
                        <div className="flex items-center gap-2">
                           <div className="w-4 h-4 bg-yellow-500 rounded-full"></div>
                           <span>Voluntariado</span>
                        </div>
                        {showUserLocation && (
                           <div className="flex items-center gap-2">
                              <div className="w-4 h-4 bg-red-500 rounded-full"></div>
                              <span>Sua Localização</span>
                           </div>
                        )}
                     </div>
                  </div>
               </div>
            </div>

            {/* Estatísticas */}
            <div className="mt-12 grid grid-cols-1 md:grid-cols-4 gap-6">
               <div className="bg-white rounded-lg shadow-md p-6 text-center">
                  <div className="text-3xl font-bold text-blue-600 mb-2">
                     {publicEvents.length}
                  </div>
                  <div className="text-gray-600">Eventos Ativos</div>
               </div>
               <div className="bg-white rounded-lg shadow-md p-6 text-center">
                  <div className="text-3xl font-bold text-green-600 mb-2">
                     {publicEvents.reduce(
                        (sum, event) => sum + (event.participants || 0),
                        0
                     )}
                  </div>
                  <div className="text-gray-600">Participantes</div>
               </div>
               <div className="bg-white rounded-lg shadow-md p-6 text-center">
                  <div className="text-3xl font-bold text-yellow-600 mb-2">
                     {publicEvents.filter((e) => e.type === 'volunteer').length}
                  </div>
                  <div className="text-gray-600">Ações de Voluntariado</div>
               </div>
               <div className="bg-white rounded-lg shadow-md p-6 text-center">
                  <div className="text-3xl font-bold text-purple-600 mb-2">
                     {publicRoutes.length}
                  </div>
                  <div className="text-gray-600">Rotas Ativas</div>
               </div>
            </div>
         </div>
      </div>
   );
}

export default MapasPage;
