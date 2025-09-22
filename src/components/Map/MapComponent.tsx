'use client';
import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import {
   MapContainer,
   TileLayer,
   Marker,
   Popup,
   Polyline,
   useMap,
} from 'react-leaflet';
import { LatLngExpression, Icon } from 'leaflet';
import {
   MapPin,
   NavigationArrowIcon,
   Users,
   Calendar,
} from '@phosphor-icons/react';

// Importar CSS do Leaflet
import 'leaflet/dist/leaflet.css';

// Configuração de ícones personalizados
const createCustomIcon = (color: string, iconType: string) => {
   // Usar ícones simples em vez de emojis para evitar problemas de codificação
   const getIconSymbol = (type: string) => {
      switch (type) {
         case 'event':
            return 'E';
         case 'donation':
            return 'D';
         case 'volunteer':
            return 'V';
         case 'user':
            return 'U';
         default:
            return '•';
      }
   };

   const svgString = `<svg width="25" height="41" viewBox="0 0 25 41" xmlns="http://www.w3.org/2000/svg">
    <path fill="${color}" stroke="#fff" stroke-width="2" d="M12.5 0C5.6 0 0 5.6 0 12.5c0 12.5 12.5 28.5 12.5 28.5s12.5-16 12.5-28.5C25 5.6 19.4 0 12.5 0z"/>
    <text x="12.5" y="18" text-anchor="middle" fill="white" font-size="12" font-family="Arial, sans-serif" font-weight="bold">
      ${getIconSymbol(iconType)}
    </text>
  </svg>`;

   // Codificar corretamente para base64
   const encodedSvg = encodeURIComponent(svgString);

   return new Icon({
      iconUrl: `data:image/svg+xml;charset=utf-8,${encodedSvg}`,
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [0, -41],
   });
};

// Componente para centralizar o mapa
const MapCenter: React.FC<{ center: LatLngExpression }> = ({ center }) => {
   const map = useMap();
   useEffect(() => {
      map.setView(center, map.getZoom());
   }, [center, map]);
   return null;
};

// Interface para eventos
interface Event {
   id: string;
   name: string;
   description: string;
   date: string;
   location: {
      lat: number;
      lng: number;
      address: string;
   };
   type: 'event' | 'donation' | 'volunteer';
   participants?: number;
}

// Interface para rotas
interface Route {
   id: string;
   name: string;
   coordinates: LatLngExpression[];
   color: string;
   description?: string;
}

// Interface para localização do usuário
interface UserLocation {
   lat: number;
   lng: number;
   accuracy?: number;
}

interface MapComponentProps {
   events?: Event[];
   routes?: Route[];
   showUserLocation?: boolean;
   center?: LatLngExpression;
   zoom?: number;
   height?: string;
   className?: string;
}

const MapComponent: React.FC<MapComponentProps> = ({
   events = [],
   routes = [],
   showUserLocation = false,
   center = [-23.5505, -46.6333], // São Paulo como padrão
   zoom = 13,
   height = '400px',
   className = '',
}) => {
   const [userLocation, setUserLocation] = useState<UserLocation | null>(null);
   const [mapCenter, setMapCenter] = useState<LatLngExpression>(center);

   // Geolocalização do usuário
   useEffect(() => {
      if (showUserLocation && navigator.geolocation) {
         navigator.geolocation.getCurrentPosition(
            (position) => {
               const { latitude, longitude, accuracy } = position.coords;
               setUserLocation({ lat: latitude, lng: longitude, accuracy });
               setMapCenter([latitude, longitude]);
            },
            (error) => {
               console.error('Erro ao obter localização:', error);
            },
            {
               enableHighAccuracy: true,
               timeout: 10000,
               maximumAge: 300000,
            }
         );
      }
   }, [showUserLocation]);

   // Ícones personalizados
   const eventIcon = createCustomIcon('#3B82F6', 'event');
   const donationIcon = createCustomIcon('#10B981', 'donation');
   const volunteerIcon = createCustomIcon('#F59E0B', 'volunteer');
   const userIcon = createCustomIcon('#EF4444', 'user');

   return (
      <div className={`w-full ${className}`} style={{ height }}>
         <MapContainer
            center={mapCenter}
            zoom={zoom}
            style={{ height: '100%', width: '100%' }}
            className="rounded-lg shadow-lg"
         >
            <TileLayer
               attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
               url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {/* Centralizar mapa quando necessário */}
            <MapCenter center={mapCenter} />

            {/* Localização do usuário */}
            {userLocation && (
               <Marker
                  position={[userLocation.lat, userLocation.lng]}
                  icon={userIcon}
               >
                  <Popup>
                     <div className="text-center">
                        <NavigationArrowIcon
                           size={20}
                           className="mx-auto mb-2 text-red-500"
                        />
                        <h3 className="font-semibold text-gray-800">
                           Sua Localização
                        </h3>
                        <p className="text-sm text-gray-600">
                           Precisão:{' '}
                           {userLocation.accuracy
                              ? `${Math.round(userLocation.accuracy)}m`
                              : 'N/A'}
                        </p>
                     </div>
                  </Popup>
               </Marker>
            )}

            {/* Eventos */}
            {events.map((event) => {
               let icon = eventIcon;
               if (event.type === 'donation') icon = donationIcon;
               if (event.type === 'volunteer') icon = volunteerIcon;

               return (
                  <Marker
                     key={event.id}
                     position={[event.location.lat, event.location.lng]}
                     icon={icon}
                  >
                     <Popup>
                        <div className="min-w-[200px]">
                           <div className="flex items-center gap-2 mb-2">
                              {event.type === 'event' && (
                                 <Calendar
                                    size={16}
                                    className="text-blue-500"
                                 />
                              )}
                              {event.type === 'donation' && (
                                 <MapPin size={16} className="text-green-500" />
                              )}
                              {event.type === 'volunteer' && (
                                 <Users size={16} className="text-yellow-500" />
                              )}
                              <h3 className="font-semibold text-gray-800">
                                 {event.name}
                              </h3>
                           </div>
                           <p className="text-sm text-gray-600 mb-2">
                              {event.description}
                           </p>
                           <p className="text-xs text-gray-500 mb-1">
                              <strong>Data:</strong>{' '}
                              {new Date(event.date).toLocaleDateString('pt-BR')}
                           </p>
                           <p className="text-xs text-gray-500 mb-1">
                              <strong>Local:</strong> {event.location.address}
                           </p>
                           {event.participants && (
                              <p className="text-xs text-gray-500">
                                 <strong>Participantes:</strong>{' '}
                                 {event.participants}
                              </p>
                           )}
                        </div>
                     </Popup>
                  </Marker>
               );
            })}

            {/* Rotas */}
            {routes.map((route) => (
               <Polyline
                  key={route.id}
                  positions={route.coordinates}
                  color={route.color}
                  weight={4}
                  opacity={0.7}
               >
                  <Popup>
                     <div className="text-center">
                        <h3 className="font-semibold text-gray-800">
                           {route.name}
                        </h3>
                        {route.description && (
                           <p className="text-sm text-gray-600">
                              {route.description}
                           </p>
                        )}
                     </div>
                  </Popup>
               </Polyline>
            ))}
         </MapContainer>
      </div>
   );
};

export default MapComponent;
