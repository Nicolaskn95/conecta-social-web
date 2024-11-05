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
  const home = [
    { value: "Nosso Trabalho", link: "/#our-job" },
    { value: "Eventos", link: "/#events" },
    { value: "Como Ajudar", link: "/#how-to-help" },
    { value: "Calendário", link: "/#calendar" },
  ];
  const about = [
    { value: "Nossa História", link: "/about/#our-history" },
    { value: "Fale Conosco", link: "/contactUs/#contacts" },
    { value: "Localização", link: "/contactUs/#location" },
    { value: "Doação por pix", link: "/contactUs/#donation-pix" },
  ];
  return (
    <footer className="bg-[#d0e7f1] p-6 flex flex-col md:flex-row md:justify-around items-center text-center md:text-left">
      <div className="flex flex-col lg:items-start items-center lg:self-start md:self-center gap-2 mb-6 md:mb-0">
        <Image src="/images/logo.svg" alt="Logo" width={240} height={240} />
        <div className="flex gap-3 mt-2">
          <div className="cursor-pointer group transition-colors">
            <FacebookLogo
              size={30}
              weight="regular"
              className="hover-facebook"
            />
          </div>
          <div className="cursor-pointer group transition-colors">
            <InstagramLogo
              size={30}
              weight="regular"
              className="hover-instagram"
            />
          </div>
          <div className="cursor-pointer group transition-colors">
            <YoutubeLogo size={30} weight="fill" className="hover-youtube" />
          </div>
          <div className="cursor-pointer group transition-colors">
            <LinkedinLogo size={30} weight="fill" className="hover-linkedin" />
          </div>
        </div>
      </div>
      <div className="flex flex-col md:flex-row gap-6 md:gap-16 mb-6 md:mb-0">
        <div>
          <h3 className="font-semibold text-lg mb-6">Home</h3>
          <ul>
            {home.map((topics, index) => (
              <Link href={topics.link} key={index}>
                <li className="">{topics.value}</li>
              </Link>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="font-semibold text-lg mb-6">Sobre</h3>
          <ul>
            {about.map((topics, index) => (
              <Link key={index} href={topics.link}>
                <li>{topics.value}</li>
              </Link>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="font-semibold text-lg mb-6">Parceiros</h3>
          <ul>
            <Link href={"#"}>
              <li>Credenciados</li>
            </Link>
          </ul>
        </div>
      </div>
      <div className="flex justify-center md:justify-end w-full md:w-auto">
        <Link href={"/login"}>
          <button className="btn-primary">Login</button>
        </Link>
      </div>
    </footer>
  );
}
