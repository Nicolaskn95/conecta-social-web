'use client';
import React from 'react';
import { usePathname } from 'next/navigation';

const PageTitle: React.FC = () => {
   const pathname = usePathname();

   // Mapeamento de rotas para títulos
   const getPageTitle = (path: string): string => {
      const titleMap: Record<string, string> = {
         '/dashboard': 'Dashboard',
         '/dashboard/donations': 'Doações',
         '/dashboard/donations/register': 'Nova Doação',
         '/dashboard/families': 'Famílias',
         '/dashboard/events': 'Eventos',
         '/dashboard/volunteers': 'Voluntários',
         '/dashboard/beneficiaries': 'Beneficiários',
      };

      // Verificar se a rota exata existe
      if (titleMap[path]) {
         return titleMap[path];
      }

      // Verificar rotas que começam com o path
      for (const [route, title] of Object.entries(titleMap)) {
         if (path.startsWith(route) && route !== '/dashboard') {
            return title;
         }
      }

      // Título padrão para dashboard
      if (path.startsWith('/dashboard')) {
         return 'Dashboard';
      }

      return 'Conecta Social';
   };

   const pageTitle = getPageTitle(pathname);

   return (
      <div className="flex items-center">
         <h1 className="text-xl font-semibold text-gray-800">{pageTitle}</h1>
      </div>
   );
};

export default PageTitle;
