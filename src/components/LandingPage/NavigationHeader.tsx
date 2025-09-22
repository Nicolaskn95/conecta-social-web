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
            <Link href="/doacoes" passHref>
               <p className="header-hover-text hover:underline cursor-pointer">
                  Doações
               </p>
            </Link>
            <Link href="/contactUs" passHref>
               <p className="header-hover-text hover:underline cursor-pointer">
                  Fale Conosco
               </p>
            </Link>
         </nav>

         <button
            className="md:hidden text-blue-500"
            onClick={() => setMenuOpen(!menuOpen)}
         >
            <ListIcon size={32} />
         </button>

         {menuOpen && (
            <nav className="header-color absolute top-16 left-0 w-full shadow-md flex flex-col items-center gap-4 py-4 md:hidden">
               <Link href="/" passHref>
                  <p
                     className="header-hover-text hover:underline cursor-pointer"
                     onClick={() => setMenuOpen(false)}
                  >
                     Home
                  </p>
               </Link>
               <Link href="/about" passHref>
                  <p
                     className="header-hover-text hover:underline cursor-pointer"
                     onClick={() => setMenuOpen(false)}
                  >
                     Sobre
                  </p>
               </Link>
               <Link href="/doacoes" passHref>
                  <p
                     className="header-hover-text hover:underline cursor-pointer"
                     onClick={() => setMenuOpen(false)}
                  >
                     Doações
                  </p>
               </Link>
               <Link href="/contactUs" passHref>
                  <p
                     className="header-hover-text hover:underline cursor-pointer"
                     onClick={() => setMenuOpen(false)}
                  >
                     Fale Conosco
                  </p>
               </Link>
            </nav>
         )}
      </>
   );
}

export default NavigationHeader;
