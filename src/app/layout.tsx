import type { Metadata } from 'next';
import { Nunito } from 'next/font/google';
import './globals.css';
import Page from '@/components/template/home/Page';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthProvider } from '@/data/context/AuthContext';
import { EventProvider } from '@/data/context/EventContext';

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
            <AuthProvider>
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
            </AuthProvider>
            <script async src="//www.instagram.com/embed.js"></script>
         </body>
      </html>
   );
}
