// components/Sidebar.js
'use client';
import {
   GaugeIcon,
   UsersIcon,
   UserIcon,
   UserSquareIcon,
   HandHeartIcon,
   CalendarIcon,
   SignOutIcon,
   IdentificationBadgeIcon,
} from '@phosphor-icons/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Sidebar() {
   const pathname = usePathname();
   const sidebarTopics = [
      {
         description: 'Dashboard',
         link: '/dashboard',
         icon: <GaugeIcon size={24} />,
      },
      {
         description: 'Famílias',
         link: '/dashboard/families',
         icon: <UsersIcon size={24} />,
      },
      // {
      //    description: 'Beneficiários',
      //    link: '/dashboard/beneficiaries',
      //    icon: <UserSquareIcon size={24} />,
      // },
      {
         description: 'Doações',
         link: '/dashboard/donations',
         icon: <HandHeartIcon size={24} />,
      },
      {
         description: 'Eventos',
         link: '/dashboard/events',
         icon: <CalendarIcon size={24} />,
      },
      {
         description: 'Voluntários',
         link: '/dashboard/volunteers',
         icon: <IdentificationBadgeIcon size={24} />,
      },
   ];

   return (
      <aside className="sidebar-color w-64 h-screen sticky top-0 self-start flex flex-col justify-between p-4 overflow-y-auto">
         <div>
            {sidebarTopics.map((topic, index) => {
               const isActive =
                  topic.link === '/dashboard'
                     ? pathname === topic.link
                     : pathname.startsWith(topic.link);
               return (
                  <Link
                     key={index}
                     href={topic.link}
                     className={`sidebar-menu flex items-center gap-2 p-2 mb-4 cursor-pointer rounded-lg ${
                        isActive ? 'sidebar-menu-selected' : ''
                     }`}
                  >
                     {topic.icon}
                     {topic.description}
                  </Link>
               );
            })}
         </div>
      </aside>
   );
}
