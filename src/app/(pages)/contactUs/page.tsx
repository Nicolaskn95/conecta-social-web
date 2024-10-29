"use client";
import Banner from "@/components/LandingPage/Banner";
import {
  InstagramLogo,
  LinkedinLogo,
  MapPin,
  Phone,
  XLogo,
  YoutubeLogo,
} from "@phosphor-icons/react";
import Image from "next/image";

export default function ContactUs() {
  return (
    <>
      <Banner imagePath="/images/contactUs1.png" />
      <div className="flex flex-col items-center px-4 py-8 md:px-16 lg:px-52">
        <h1 className="title text-center mb-8">Localização</h1>
        <section className="flex flex-col md:flex-row items-center justify-center gap-8 w-full mb-12">
          <div className="card-effect flex-col items-center justify-items-center w-full text-center md:w-1/2">
            <MapPin size={50} weight="fill" color="#BCD4E1" className="mb-2" />
            <p className="font-semibold text-gray-800 mb-2">Visite-nos!</p>
            <p className="text-gray-600">
              Rua Lorem Ipsum, 4923 - Sorocaba - São Paulo - Brasil
            </p>
            <p className="text-gray-600">
              Segunda-feira - Sexta-feira: 10:00 - 16:00
            </p>
          </div>
          <div className="w-full h-64 md:w-1/2">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d405692.27052063734!2d-122.37144151498244!3d37.40234403831709!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x808fb68ad0cfc739%3A0x7eb356b66bd4b50e!2sVale%20do%20Sil%C3%ADcio%2C%20CA%2C%20EUA!5e0!3m2!1spt-BR!2sbr!4v1730206402583!5m2!1spt-BR!2sbr"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              loading="lazy"
            ></iframe>
          </div>
        </section>
        <h2 className="title text-center mb-2">Fale Conosco</h2>
        <p className="sub-title text-center mb-12">Contatos</p>
        <section className="flex flex-col md:flex-row items-start justify-center gap-12">
          <div className="card-effect flex-1 flex-col items-center justify-items-center w-full text-center h-72">
            <p className="font-semibold text-gray-800 mb-4">
              Nos siga nas redes sociais:
            </p>
            <div className="flex flex-col gap-2 items-start justify-between">
              <div className="flex items-start justify-between gap-4">
                <XLogo size={32} />
                <p>@conectasocial</p>
              </div>
              <div className="flex items-center justify-around gap-4">
                <InstagramLogo size={30} />
                <p>@conectasocial</p>
              </div>
              <div className="flex items-center justify-around gap-4">
                <YoutubeLogo size={30} weight="fill" />
                <p>@conectasocial</p>
              </div>
              <div className="flex items-center justify-around gap-4">
                <LinkedinLogo size={30} weight="fill" />
                <p>@conectasocial</p>
              </div>
              <div className="flex items-center justify-around gap-4">
                <Phone size={30} weight="fill" />
                <p>+55 (15) 99999-9999</p>
              </div>
            </div>
          </div>
          <div className="card-effect flex-1 flex flex-col items-center text-center h-72">
            <p className="font-semibold text-gray-800 mb-4">Faça uma doação!</p>
            <p className="text-gray-600 mb-4">
              Gostou do nosso trabalho? Junte-se a nós e contribua agora mesmo.
              Muito obrigado pelo apoio!
            </p>
            <Image
              src="/images/fakeQRcode.png"
              alt="QR Code for Donation"
              width={120}
              height={120}
              style={{ objectFit: "contain" }}
            />
            <p className="text-gray-600">CHAVE PIX</p>
          </div>
        </section>
      </div>
    </>
  );
}
