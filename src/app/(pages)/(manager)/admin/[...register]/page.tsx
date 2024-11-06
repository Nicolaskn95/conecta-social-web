"use client";
import { Question } from "@phosphor-icons/react";
import React from "react";

function Register() {
  return (
    <div className="min-h-screen p-4 bg-gray-100">
      <div className="flex justify-between items-center p-2 mb-4">
        <p className="font-bold">{"Inicio > Eventos > Cadastro"}</p>
      </div>
      <div className="p-6 bg-white rounded-3xl shadow-md border border-[#4AA1D3] space-y-6">
        <div className="flex flex-wrap gap-4">
          <div className="flex flex-col flex-1 min-w-[250px]">
            <label htmlFor="titulo" className="font-semibold mb-1">
              Título do evento
            </label>
            <input
              type="text"
              id="titulo"
              className="input"
              placeholder="Informe o título do evento"
            />
          </div>
          <div className="flex flex-col flex-1 min-w-[250px]">
            <label htmlFor="cep" className="font-semibold mb-1">
              CEP
            </label>
            <input
              type="text"
              id="cep"
              className="input"
              placeholder="Digite o CEP"
            />
          </div>
        </div>

        <div className="flex flex-wrap gap-4">
          <div className="flex flex-col flex-1 min-w-[250px]">
            <label htmlFor="descricao" className="font-semibold mb-1">
              Descrição do evento
            </label>
            <input
              type="text"
              id="descricao"
              className="input"
              placeholder="Breve descrição do evento"
            />
          </div>
          <div className="flex flex-col flex-1 min-w-[250px]">
            <label htmlFor="rua" className="font-semibold mb-1">
              Rua
            </label>
            <input
              type="text"
              id="rua"
              className="input"
              placeholder="Logradouro"
            />
          </div>
        </div>

        <div className="flex flex-wrap gap-4">
          <div className="flex flex-col flex-1 min-w-[250px]">
            <label htmlFor="data" className="font-semibold mb-1">
              Data do Evento
            </label>
            <input type="date" id="data" className="input" />
          </div>
          <div className="flex flex-col flex-1 min-w-[250px]">
            <label htmlFor="numero" className="font-semibold mb-1">
              Número
            </label>
            <input
              type="text"
              id="numero"
              className="input"
              placeholder="Digite o número"
            />
          </div>
          <div className="flex flex-col flex-1 min-w-[250px]">
            <label htmlFor="complemento" className="font-semibold mb-1">
              Complemento
            </label>
            <input
              type="text"
              id="complemento"
              className="input"
              placeholder="Bloco, apartamento..."
            />
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <div className="flex flex-col flex-1 min-w-[250px]">
            <label htmlFor="instagram" className="font-semibold mb-1">
              Post do Instagram (embed)
            </label>
            <input
              type="text"
              id="instagram"
              className="input"
              placeholder="Insira o link do post do Instagram"
            />
          </div>
          <button className="self-end rounded-md p-2 text-primary bg-tertiary hover:bg-primary hover:text-white">
            <Question size={24} />
          </button>
          <div className="flex flex-col flex-1 min-w-[250px]">
            <label htmlFor="estado" className="font-semibold mb-1">
              Estado
            </label>
            <input
              type="text"
              id="estado"
              className="input"
              placeholder="Digite o estado"
            />
          </div>
          <div className="flex flex-col flex-1 min-w-[250px]">
            <label htmlFor="cidade" className="font-semibold mb-1">
              Cidade
            </label>
            <input
              type="text"
              id="cidade"
              className="input"
              placeholder="Digite a cidade"
            />
          </div>
        </div>
        <div className="flex justify-end gap-4">
          <button className="btn-danger w-32 text-white">Cancelar</button>
          <button className="btn-primary w-32">Cadastrar</button>
        </div>
      </div>
    </div>
  );
}

export default Register;
