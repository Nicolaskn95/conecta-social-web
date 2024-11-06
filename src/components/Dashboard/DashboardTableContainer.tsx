// components/EventTable.js
"use client";

import { mockEvents } from "@/core/constants";
import { Pencil, Trash } from "@phosphor-icons/react";
import SearchInput from "./SearchInput";
import Status from "./Status";

export default function DashboardTableContainer() {
  const title = [
    "Data do Cadastro",
    "Título do evento",
    "Data do evento",
    "Localização",
    "Status",
    "Detalhes",
    "Alterar",
    "Excluir",
  ];
  return (
    <div className="p-4 bg-white rounded-3xl shadow-md border border-[#4AA1D3]">
      <div className="flex items-start justify-between p-3">
        <h1 className="mb-4 text-2xl font-extrabold">Todos os Eventos</h1>
        <SearchInput />
      </div>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr>
              {title.map((title, index) => (
                <th key={index} className="px-4 py-2 text-start">
                  {title}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {mockEvents.map((event, index) => (
              <tr className="row-data" key={index}>
                <td className="px-4 py-2">{event.registrationDate}</td>
                <td className="px-4 py-2">{event.title}</td>
                <td className="px-4 py-2">{event.eventDate}</td>
                <td className="px-4 py-2">{event.location}</td>
                <td className="px-4 py-2">
                  <Status status={event.status} />
                </td>
                <td className="px-4 py-2 text-start">{event.details}</td>
                <td className="px-4 py-2 text-center ">
                  <button>
                    <div className="rounded-md p-2 text-primary bg-tertiary hover:bg-primary hover:text-white">
                      <Pencil size={24} />
                    </div>
                  </button>
                </td>
                <td className="px-4 py-2 text-center ">
                  <button>
                    <div className="text-danger hover:text-white bg-danger_hover rounded-md p-2 hover:bg-danger ">
                      <Trash size={24} className="" />
                    </div>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* //:TODO: PAGINATION */}
    </div>
  );
}
