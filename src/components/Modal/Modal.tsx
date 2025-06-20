import React from 'react';

interface ModalProps {
   isOpen: boolean;
   onClose: () => void;
   title: string;
   children: React.ReactNode;
}

export default function Modal({
   isOpen,
   onClose,
   title,
   children,
}: ModalProps) {
   if (!isOpen) return null;

   return (
      <div className="fixed inset-0 z-50 overflow-y-auto">
         <div className="flex min-h-screen items-center justify-center p-4 text-center">
            <div
               className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
               onClick={onClose}
            />

            <div className="relative transform overflow-hidden rounded-lg bg-white p-6 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
               <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-medium leading-6 text-gray-900">
                     {title}
                  </h3>
                  <button
                     onClick={onClose}
                     className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none"
                  >
                     <span className="sr-only">Fechar</span>
                     <svg
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                     >
                        <path
                           strokeLinecap="round"
                           strokeLinejoin="round"
                           d="M6 18L18 6M6 6l12 12"
                        />
                     </svg>
                  </button>
               </div>
               {children}
            </div>
         </div>
      </div>
   );
}
