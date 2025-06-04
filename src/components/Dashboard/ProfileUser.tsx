import useAuth from '@/data/hooks/useAuth';
import React, { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';

function ProfileUser() {
   const [userColor, setUserColor] = useState<string>('');
   const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
   const dropdownRef = useRef<HTMLDivElement>(null);
   const router = useRouter();

   const { user, logout } = useAuth();

   // Verifica se o usuário está disponível e se o nome não é undefined
   const firstname = user?.name;
   const lastname = user?.surname;
   const nameParts = user?.name ? user.name.split(' ') : [];
   const firstnameLetter =
      nameParts.length > 0 ? nameParts[0][0].toUpperCase() : '';
   const lastnameLetter = lastname ? lastname[0].toUpperCase() : '';

   const generateRandomColor = () => {
      const letters = '0123456789ABCDEF';
      let color = '#';

      for (let i = 0; i < 6; i++) {
         color += letters[Math.floor(Math.random() * 16)];
      }

      return color;
   };

   const handleDropdownToggle = () => {
      setIsDropdownOpen(!isDropdownOpen);
   };

   const handleClickOutside = (event: MouseEvent) => {
      if (
         dropdownRef.current &&
         !dropdownRef.current.contains(event.target as Node)
      ) {
         setIsDropdownOpen(false);
      }
   };

   const handleProfileClick = () => {
      // router.push('/admin/profile');
      setIsDropdownOpen(false);
   };

   const handleSettingsClick = () => {
      // router.push('/admin/settings');
      setIsDropdownOpen(false);
   };

   useEffect(() => {
      setUserColor(generateRandomColor());
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
         document.removeEventListener('mousedown', handleClickOutside);
      };
   }, []);

   return (
      <div
         className="relative flex items-center space-x-3 mr-10"
         ref={dropdownRef}
      >
         <div
            className="border border-[#090934] text-white rounded-full h-10 w-10 flex items-center justify-center font-semibold cursor-pointer hover:opacity-90 transition-opacity"
            style={{ backgroundColor: userColor }}
            onClick={handleDropdownToggle}
         >
            {`${firstnameLetter}${lastnameLetter}`}
         </div>

         <div className="cursor-pointer" onClick={handleDropdownToggle}>
            <p className="font-semibold text-gray-800">{`${firstname} ${lastname}`}</p>
            <p className="text-sm text-gray-500">Project Manager</p>
         </div>

         <button
            className="text-gray-600 hover:text-gray-800 transition-colors"
            onClick={handleDropdownToggle}
         >
            <svg
               xmlns="http://www.w3.org/2000/svg"
               fill="none"
               viewBox="0 0 24 24"
               strokeWidth="2"
               stroke="currentColor"
               className={`h-5 w-5 transition-transform ${
                  isDropdownOpen ? 'rotate-180' : ''
               }`}
            >
               <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 9l6 6 6-6"
               />
            </svg>
         </button>

         {isDropdownOpen && (
            <div className="absolute right-0 top-full mt-2 w-56 bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden z-50">
               <div className="p-4 border-b border-gray-100">
                  <p className="font-semibold text-gray-800">{`${firstname} ${lastname}`}</p>
                  <p className="text-sm text-gray-500">{user?.email}</p>
               </div>
               <ul className="py-2">
                  <li
                     onClick={handleProfileClick}
                     className="px-4 py-2 hover:bg-gray-50 cursor-pointer flex items-center text-gray-700 hover:text-blue-600 transition-colors"
                  >
                     <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 mr-3"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                     >
                        <path
                           strokeLinecap="round"
                           strokeLinejoin="round"
                           strokeWidth={2}
                           d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                        />
                     </svg>
                     Meu Perfil
                  </li>
                  <li
                     onClick={handleSettingsClick}
                     className="px-4 py-2 hover:bg-gray-50 cursor-pointer flex items-center text-gray-700 hover:text-blue-600 transition-colors"
                  >
                     <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 mr-3"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                     >
                        <path
                           strokeLinecap="round"
                           strokeLinejoin="round"
                           strokeWidth={2}
                           d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                        />
                        <path
                           strokeLinecap="round"
                           strokeLinejoin="round"
                           strokeWidth={2}
                           d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                     </svg>
                     Configurações
                  </li>
                  <li className="border-t border-gray-100">
                     <button
                        onClick={logout}
                        className="w-full px-4 py-2 hover:bg-gray-50 cursor-pointer flex items-center text-red-600 hover:text-red-700 transition-colors"
                     >
                        <svg
                           xmlns="http://www.w3.org/2000/svg"
                           className="h-5 w-5 mr-3"
                           fill="none"
                           viewBox="0 0 24 24"
                           stroke="currentColor"
                        >
                           <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                           />
                        </svg>
                        Sair
                     </button>
                  </li>
               </ul>
            </div>
         )}
      </div>
   );
}

export default ProfileUser;
