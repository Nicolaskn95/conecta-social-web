"use client";
import {
  FacebookLogo,
  InstagramLogo,
  LinkedinLogo,
  YoutubeLogo,
} from "@phosphor-icons/react";
import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#d0e7f1] p-6 flex flex-col md:flex-row md:justify-around items-center text-center md:text-left">
      {/* Logo e Redes Sociais */}
      <div className="flex flex-col items-center md:items-start gap-2 mb-6 md:mb-0">
        <Image src="/images/logo.svg" alt="Logo" width={240} height={240} />
        <div className="flex gap-3 mt-2">
          <FacebookLogo
            size={30}
            className="cursor-pointer text-black hover:text-blue-600 transition-colors"
          />
          <InstagramLogo
            size={30}
            className="cursor-pointer text-black hover:text-pink-500 transition-colors"
          />
          <YoutubeLogo
            size={30}
            className="cursor-pointer text-black hover:text-red-600 transition-colors"
          />
          <LinkedinLogo
            size={30}
            className="cursor-pointer text-black hover:text-blue-700 transition-colors"
          />
        </div>
      </div>

      {/* Links de navegação */}
      <div className="flex flex-col md:flex-row gap-6 md:gap-16 mb-6 md:mb-0">
        <div>
          <h3 className="font-semibold text-lg mb-2">Home</h3>
          <ul className="space-y-1 text-gray-700">
            <li>Nosso Trabalho</li>
            <li>Eventos</li>
            <li>Como Ajudar</li>
            <li>Calendário</li>
          </ul>
        </div>
        <div>
          <h3 className="font-semibold text-lg mb-2">Sobre</h3>
          <ul className="space-y-1 text-gray-700">
            <li>Nossa História</li>
            <li>Fale Conosco</li>
            <li>Localização</li>
            <li>Doação por Pix</li>
          </ul>
        </div>
        <div>
          <h3 className="font-semibold text-lg mb-2">Parceiros</h3>
          <ul className="space-y-1 text-gray-700">
            <li>Credenciados</li>
          </ul>
        </div>
      </div>

      {/* Botão de login */}
      <div className="flex justify-center md:justify-end w-full md:w-auto">
        <Link href={"/login"}>
          <button className="btn-primary">Login</button>
        </Link>
      </div>
    </footer>
  );
}
