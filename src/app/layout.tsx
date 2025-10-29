import type { Metadata } from 'next';
import { Nunito } from 'next/font/google';
import './globals.css';
import Page from '@/components/template/home/Page';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AuthInitializer from '@/components/shared/AuthInitializer';
import { EventProvider } from '@/data/context/EventContext';
import { QueryProvider } from '@/data/providers/QueryProvider';

const nunito = Nunito({
   subsets: ['latin'],
   weight: ['200', '300', '500', '700'],
   preload: true,
});

export const metadata: Metadata = {
   title: 'Conecta Social',
};

export default function RootLayout({
   children,
}: Readonly<{
   children: React.ReactNode;
}>) {
   return (
      <html lang="pt-BR">
         <body className={`${nunito.className}`}>
            <QueryProvider>
               <AuthInitializer>
                  <EventProvider>
                     <ToastContainer
                        position="top-right"
                        autoClose={5000}
                        pauseOnFocusLoss
                        draggable
                        pauseOnHover={false}
                        theme="colored"
                     />
                     <Page>{children}</Page>
                  </EventProvider>
               </AuthInitializer>
            </QueryProvider>
            <script async src="//www.instagram.com/embed.js"></script>
         </body>
      </html>
   );
}
