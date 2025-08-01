'use client';
import {
   FacebookLogoIcon,
   InstagramLogoIcon,
   LinkedinLogoIcon,
   YoutubeLogoIcon,
   MapPinIcon,
   EnvelopeIcon,
   PhoneIcon,
   HeartIcon,
} from '@phosphor-icons/react';
import Image from 'next/image';
import Link from 'next/link';

export default function Footer() {
   const home = [
      { value: 'Nosso Trabalho', link: '/#our-job' },
      { value: 'Eventos', link: '/#events' },
      { value: 'Como Ajudar', link: '/#how-to-help' },
      { value: 'Calendário', link: '/#calendar' },
   ];
   const about = [
      { value: 'Nossa História', link: '/about/#our-history' },
      { value: 'Fale Conosco', link: '/contactUs/#contacts' },
      { value: 'Localização', link: '/contactUs/#location' },
      { value: 'Doação via pix', link: '/contactUs/#donation-pix' },
   ];

   const currentYear = new Date().getFullYear();

   return (
      <footer className="bg-header_sidebar_color">
         {/* Main Footer Content */}
         <div className="container mx-auto px-6 py-12">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
               {/* Logo and Social Media */}
               <div className="lg:col-span-1">
                  <div className="flex flex-col items-center lg:items-start">
                     <Image
                        src="/images/logo.svg"
                        alt="Logo"
                        width={200}
                        height={200}
                        className="mb-4"
                     />
                     <p className="text-gray-600 text-sm text-center lg:text-left mb-6 max-w-xs">
                        Transformando vidas através da educação, amor e
                        esperança. Junte-se a nós nesta jornada de transformação
                        social.
                     </p>
                     <div className="flex gap-4">
                        <Link
                           href="https://facebook.com"
                           className="bg-blue-600 text-white p-3 rounded-full hover:bg-blue-700 transition-colors duration-300 transform hover:scale-110"
                           aria-label="Facebook"
                        >
                           <FacebookLogoIcon size={20} weight="fill" />
                        </Link>
                        <Link
                           href="https://instagram.com"
                           className="bg-gradient-to-r from-purple-500 to-pink-500 text-white p-3 rounded-full hover:from-purple-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-110"
                           aria-label="Instagram"
                        >
                           <InstagramLogoIcon size={20} weight="fill" />
                        </Link>
                        <Link
                           href="https://youtube.com"
                           className="bg-red-600 text-white p-3 rounded-full hover:bg-red-700 transition-colors duration-300 transform hover:scale-110"
                           aria-label="YouTube"
                        >
                           <YoutubeLogoIcon size={20} weight="fill" />
                        </Link>
                        <Link
                           href="https://linkedin.com"
                           className="bg-blue-700 text-white p-3 rounded-full hover:bg-blue-800 transition-colors duration-300 transform hover:scale-110"
                           aria-label="LinkedIn"
                        >
                           <LinkedinLogoIcon size={20} weight="fill" />
                        </Link>
                     </div>
                  </div>
               </div>

               {/* Home Links */}
               <div className="lg:col-span-1">
                  <h3 className="font-bold text-lg text-gray-800 mb-6 text-center lg:text-left">
                     Home
                  </h3>
                  <ul className="space-y-3 text-center lg:text-left">
                     {home.map((topic, index) => (
                        <li key={index}>
                           <Link
                              href={topic.link}
                              className="text-gray-600 hover:text-blue-600 transition-colors duration-300 hover:underline"
                           >
                              {topic.value}
                           </Link>
                        </li>
                     ))}
                  </ul>
               </div>

               {/* About Links */}
               <div className="lg:col-span-1">
                  <h3 className="font-bold text-lg text-gray-800 mb-6 text-center lg:text-left">
                     Sobre
                  </h3>
                  <ul className="space-y-3 text-center lg:text-left">
                     {about.map((topic, index) => (
                        <li key={index}>
                           <Link
                              href={topic.link}
                              className="text-gray-600 hover:text-blue-600 transition-colors duration-300 hover:underline"
                           >
                              {topic.value}
                           </Link>
                        </li>
                     ))}
                  </ul>
               </div>

               {/* Partners Section */}
               <div className="lg:col-span-1">
                  <h3 className="font-bold text-lg text-gray-800 mb-6 text-center lg:text-left">
                     Parceiros
                  </h3>
                  <ul className="space-y-3 text-center lg:text-left">
                     <li>
                        <Link
                           href="/login"
                           className="text-gray-600 hover:text-blue-600 transition-colors duration-300 hover:underline"
                        >
                           Credenciados
                        </Link>
                     </li>
                  </ul>
               </div>
            </div>
         </div>

         {/* Bottom Bar */}
         <div className="border-t border-blue-200 bg-white">
            <div className="container mx-auto px-4 py-1 justify-items-center">
               <div className="flex flex-col md:flex-row items-center gap-4">
                  <div className="flex items-center gap-2 text-gray-600 text-sm">
                     <span>Desenvolvido com</span>
                     <HeartIcon
                        size={28}
                        className="text-red-500 animate-pulse"
                     />
                     <span>por</span>
                     <span className="font-bold text-primary">OSS</span>
                  </div>
               </div>
            </div>
         </div>
      </footer>
   );
}
