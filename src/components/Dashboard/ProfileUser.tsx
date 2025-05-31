import useAuth from '@/data/hooks/useAuth';
import React, { useEffect, useState } from 'react';

function ProfileUser() {
   const [userColor, setUserColor] = useState<string>('');
   const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);

   const { user, logout } = useAuth();

   // Verifica se o usuário está disponível e se o nome não é undefined
   const firstname = user?.name;
   const lastname = user?.surname;
   const nameParts = user?.name ? user.name.split(' ') : [];
   const firstnameLetter =
      nameParts.length > 0 ? nameParts[0][0].toUpperCase() : '';
   const lastnameLetter =
      nameParts.length > 1
         ? nameParts[nameParts.length - 1][0].toUpperCase()
         : '';

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

   useEffect(() => {
      setUserColor(generateRandomColor());
   }, []);

   return (
      <div className="relative flex items-center space-x-3 mr-10">
         <div
            className="border border-[#090934] text-white rounded-full h-10 w-10 flex items-center justify-center font-semibold"
            style={{ backgroundColor: userColor }}
         >
            {`${firstnameLetter}${lastnameLetter}`}{' '}
         </div>

         <div>
            <p className="font-semibold">{`${firstname} ${lastname}`}</p>
            <p className="text-sm text-gray-500">Project Manager</p>
         </div>

         <button className="text-gray-600" onClick={handleDropdownToggle}>
            <svg
               xmlns="http://www.w3.org/2000/svg"
               fill="none"
               viewBox="0 0 24 24"
               strokeWidth="2"
               stroke="currentColor"
               className="h-5 w-5"
            >
               <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 9l6 6 6-6"
               />
            </svg>
         </button>

         {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-300 rounded-lg shadow-lg">
               <ul className="text-sm">
                  <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                     Perfil
                  </li>
                  <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                     Configurações
                  </li>
                  <li
                     onClick={logout}
                     className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  >
                     Sair
                  </li>
               </ul>
            </div>
         )}
      </div>
   );
}

export default ProfileUser;
