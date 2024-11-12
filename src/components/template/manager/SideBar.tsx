// components/Sidebar.js
"use client";
import {
  House,
  Users,
  HandHeart,
  Calendar,
  IdentificationCard,
  SignOut,
  UserSquare,
  IdentificationBadge,
  UsersThree,
} from "@phosphor-icons/react";
import Link from "next/link";

export default function Sidebar() {
  const sidebarTopics = [
    {
      description: "Dashboard",
      link: "/admin",
      icon: <UserSquare size={24} />,
    },
    {
      description: "Famílias",
      link: "/admin/families",
      icon: <UsersThree size={24} />,
    },
    {
      description: "Doações",
      link: "/admin/donations",
      icon: <HandHeart size={24} />,
    },
    {
      description: "Eventos",
      link: "/admin/events",
      icon: <Calendar size={24} />,
    },
    {
      description: "Administrador",
      link: "/admin/managers",
      icon: <IdentificationBadge size={24} />,
    },
  ];

  return (
    <aside className="sidebar-color w-64 h-auto flex flex-col justify-between p-4">
      <div>
        {sidebarTopics.map((topic, index) => (
          <Link
            key={index}
            href={topic.link}
            className="sidebar-menu flex items-center gap-2 p-2 mb-4 cursor-pointer rounded-lg"
          >
            {topic.icon}
            {topic.description}
          </Link>
        ))}
      </div>
      <div className="flex items-center gap-2 p-2 hover:bg-[#A13838] hover:text-white text-[#387AA1] cursor-pointer rounded-lg">
        <SignOut size={24} />
        Logout
      </div>
    </aside>
  );
}
