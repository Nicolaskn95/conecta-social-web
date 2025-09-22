'use client';
import dynamic from 'next/dynamic';
import { LatLngExpression } from 'leaflet';

// Componente de loading
const MapLoading = () => (
  <div className="w-full h-full flex items-center justify-center bg-gray-100 rounded-lg">
    <div className="text-center">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-2"></div>
      <p className="text-sm text-gray-600">Carregando mapa...</p>
    </div>
  </div>
);

// Importar o componente de mapa dinamicamente
const MapComponent = dynamic(() => import('./MapComponent'), {
  loading: () => <MapLoading />,
  ssr: false, // Desabilitar SSR para evitar problemas com Leaflet
});

interface DynamicMapProps {
  events?: any[];
  routes?: any[];
  showUserLocation?: boolean;
  center?: LatLngExpression;
  zoom?: number;
  height?: string;
  className?: string;
}

const DynamicMap: React.FC<DynamicMapProps> = (props) => {
  return <MapComponent {...props} />;
};

export default DynamicMap;
