import React, { useState } from 'react';
import Link from 'next/link';
import { ListIcon } from '@phosphor-icons/react';

function NavigationHeader() {
   const [menuOpen, setMenuOpen] = useState(false);

   return (
      <>
         <nav className="hidden md:flex items-center gap-10 mr-10">
            <Link href="/" passHref>
               <p className="header-hover-text hover:underline cursor-pointer">
                  Home
               </p>
            </Link>
            <Link href="/about" passHref>
               <p className="header-hover-text hover:underline cursor-pointer">
                  Sobre
               </p>
            </Link>
            <Link href="/contactUs" passHref>
               <p className="header-hover-text hover:underline cursor-pointer">
                  Fale Conosco
               </p>
            </Link>
         </nav>

         <button
            className="md:hidden p-2 rounded-lg transition-colors duration-200 hover:bg-primary/10"
            onClick={() => setMenuOpen(!menuOpen)}
         >
            <ListIcon size={28} className="text-primary" />
         </button>

         <nav
            className={`bg-tertiary/60 absolute top-16 left-0 w-full border-t-2 border-b-2 border-secondary shadow-2xl flex flex-col items-center gap-4 py-6 md:hidden transition-all duration-300 ease-in-out backdrop-blur-md ${
               menuOpen
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 -translate-y-4 pointer-events-none'
            }`}
         >
            <Link href="/" passHref>
               <p
                  className={`text-primary hover:text-secondary cursor-pointer font-medium text-lg transition-all duration-300 hover:scale-105 transform ${
                     menuOpen
                        ? 'opacity-100 translate-y-0'
                        : 'opacity-0 translate-y-4'
                  }`}
                  style={{ transitionDelay: menuOpen ? '100ms' : '0ms' }}
                  onClick={() => setMenuOpen(false)}
               >
                  Home
               </p>
            </Link>
            <Link href="/about" passHref>
               <p
                  className={`text-primary hover:text-secondary cursor-pointer font-medium text-lg transition-all duration-300 hover:scale-105 transform ${
                     menuOpen
                        ? 'opacity-100 translate-y-0'
                        : 'opacity-0 translate-y-4'
                  }`}
                  style={{ transitionDelay: menuOpen ? '200ms' : '0ms' }}
                  onClick={() => setMenuOpen(false)}
               >
                  Sobre
               </p>
            </Link>
            <Link href="/contactUs" passHref>
               <p
                  className={`text-primary hover:text-secondary cursor-pointer font-medium text-lg transition-all duration-300 hover:scale-105 transform ${
                     menuOpen
                        ? 'opacity-100 translate-y-0'
                        : 'opacity-0 translate-y-4'
                  }`}
                  style={{ transitionDelay: menuOpen ? '300ms' : '0ms' }}
                  onClick={() => setMenuOpen(false)}
               >
                  Fale Conosco
               </p>
            </Link>
         </nav>
      </>
   );
}

export default NavigationHeader;
