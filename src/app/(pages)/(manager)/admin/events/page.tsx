"use client";
import DashboardTableContainer from "@/components/Dashboard/DashboardTableContainer";
import { useRouter } from "next/navigation";
import React from "react";

function Events() {
  const router = useRouter();
  const register = () => {
    router.push("/admin/register");
  };

  return (
    <div className=" min-h-screen p-4 bg-gray-100">
      <div className="flex justify-between items-center p-2">
        <p className="font-bold">{"Inicio > Eventos"}</p>
        <button
          className="btn-primary flex text-nowrap w-32 text-center"
          onClick={register}
        >
          Novo Evento
        </button>
      </div>
      <DashboardTableContainer />
    </div>
  );
}

export default Events;
