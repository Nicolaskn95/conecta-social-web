'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { List } from '@phosphor-icons/react';
import NavigationHeader from '@/components/LandingPage/NavigationHeader';
import ProfileUser from '@/components/template/manager/ProfileUser';
interface HeaderProps {
   logged: boolean;
}

const Header = ({ logged }: HeaderProps) => {
   const [menuOpen, setMenuOpen] = useState(false);

   return (
      <header
         className={`header-color flex justify-between items-center p-4 sticky top-0 z-50 ${
            !logged ? 'shadow-lg' : ''
         }`}
      >
         <Link href={'/'}>
            <div>
               <Image
                  src="/images/logo.svg"
                  width={180}
                  height={160}
                  alt="logo"
               />
            </div>
         </Link>
         {!logged ? <NavigationHeader /> : <ProfileUser />}
      </header>
   );
};

export default Header;
