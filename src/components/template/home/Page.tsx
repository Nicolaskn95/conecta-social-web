'use client';
import { usePathname } from 'next/navigation';
import Header from '../home/Header'; // Importando o Header para Landing Page e Dashboard

import Footer from './Footer'; // Importando o Footer
import { ReactNode } from 'react';
import Sidebar from '../manager/SideBar';

interface PageProps {
   children: ReactNode;
   className?: string;
   noHeader?: boolean;
   noFooter?: boolean;
}

const publicRoutes = ['/', '/about', '/contactUs', '/login'];

function Page(props: PageProps) {
   const path = usePathname(); // Obtém a pathname da URL
   const isPublicRoute = publicRoutes.includes(path); // Verifica se a rota é pública
   const isDashboardRoute = path.startsWith('/dashboard');

   return (
      <div
         className="flex flex-col min-h-screen"
         style={{
            background: 'white',
         }}
      >
         <div className="flex-1 flex flex-col w-full">
            {!props.noHeader &&
               (isPublicRoute ? <Header logged={false} /> : null)}

            {isDashboardRoute ? (
               <div
                  className="flex h-screen flex-col overflow-hidden"
                  style={{
                     background: 'white',
                  }}
               >
                  <Header logged />
                  <div className="flex min-h-0 flex-1 w-full overflow-hidden">
                     <Sidebar />
                     <div className="min-w-0 flex-1 flex flex-col overflow-y-auto">
                        <main
                           className={`flex-1 flex flex-col${
                              props.className ?? ''
                           }`}
                        >
                           {props.children}
                        </main>
                     </div>
                  </div>
               </div>
            ) : (
               <main
                  className={`flex-1 flex flex-col place-content-center ${
                     props.className ?? ''
                  }`}
               >
                  {props.children}
               </main>
            )}

            {/* Exibe o Footer apenas para rotas públicas */}
            {isPublicRoute && !props.noFooter && <Footer />}
         </div>
      </div>
   );
}

export default Page;
