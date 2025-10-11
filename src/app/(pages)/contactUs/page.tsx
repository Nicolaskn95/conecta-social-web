'use client';
import Banner from '@/components/LandingPage/Banner';
import {
   InstagramLogoIcon,
   LinkedinLogoIcon,
   MapPinIcon,
   PhoneIcon,
   XLogoIcon,
   YoutubeLogoIcon,
   CheckIcon,
} from '@phosphor-icons/react';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

export default function ContactUs() {
   const [pixCopied, setPixCopied] = useState(false);
   return (
      <div className="min-h-screen bg-gradient-to-br from-white via-blue-50 to-white">
         <Banner imagePath="/images/contactUs1.png" />
         <main className="relative z-10">
            {/* Hero Section */}
            <section className="py-20 px-4 sm:px-6 lg:px-8">
               <div className="max-w-7xl mx-auto text-center">
                  <div className="mb-16">
                     <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-text_color mb-4">
                        Fale Conosco
                     </h1>
                     <div className="w-24 h-1 bg-gradient-to-r from-primary to-secondary mx-auto mb-6"></div>
                     <p className="text-xl text-primary font-light tracking-wide">
                        Estamos aqui para conectar e transformar vidas juntos
                     </p>
                  </div>
               </div>
            </section>
            {/* Location Section */}
            <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-50 to-indigo-50">
               <div className="max-w-7xl mx-auto">
                  <div className="text-center mb-16">
                     <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-text_color mb-4">
                        Localização
                     </h2>
                     <div className="w-24 h-1 bg-gradient-to-r from-primary to-secondary mx-auto mb-6"></div>
                     <p className="text-xl text-primary font-light tracking-wide">
                        Venha nos conhecer pessoalmente
                     </p>
                  </div>

                  <div className="grid lg:grid-cols-2 gap-12 items-center">
                     <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
                        <div className="flex flex-col items-center text-center">
                           <div className="w-20 h-20 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-full flex items-center justify-center mb-6">
                              <MapPinIcon
                                 size={40}
                                 weight="fill"
                                 className="text-primary"
                              />
                           </div>
                           <h3 className="text-2xl font-bold text-text_color mb-4">
                              Visite-nos!
                           </h3>
                           <div className="space-y-3">
                              <p className="text-gray-700 text-lg">
                                 Rua Lorem Ipsum, 4923
                              </p>
                              <p className="text-gray-700 text-lg">
                                 Sorocaba - São Paulo - Brasil
                              </p>
                              <div className="pt-4 border-t border-gray-200">
                                 <p className="text-primary font-semibold">
                                    Horário de Funcionamento
                                 </p>
                                 <p className="text-gray-600">
                                    Segunda-feira - Sexta-feira: 10:00 - 16:00
                                 </p>
                              </div>
                           </div>
                        </div>
                     </div>

                     <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
                        <iframe
                           src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d405692.27052063734!2d-122.37144151498244!3d37.40234403831709!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x808fb68ad0cfc739%3A0x7eb356b66bd4b50e!2sVale%20do%20Sil%C3%ADcio%2C%20CA%2C%20EUA!5e0!3m2!1spt-BR!2sbr!4v1730206402583!5m2!1spt-BR!2sbr"
                           width="100%"
                           height="400"
                           style={{ border: 0 }}
                           loading="lazy"
                           className="w-full"
                        ></iframe>
                     </div>
                  </div>
               </div>
            </section>
            {/* Contact Section */}
            <section className="py-20 px-4 sm:px-6 lg:px-8">
               <div className="max-w-7xl mx-auto">
                  <div className="text-center mb-16">
                     <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-text_color mb-4">
                        Entre em Contato
                     </h2>
                     <div className="w-24 h-1 bg-gradient-to-r from-primary to-secondary mx-auto mb-6"></div>
                     <p className="text-xl text-primary font-light tracking-wide">
                        Conecte-se conosco através das nossas redes sociais
                     </p>
                  </div>

                  <div className="grid lg:grid-cols-2 gap-12">
                     <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
                        <div className="text-center mb-8">
                           <h3 className="text-2xl font-bold text-text_color mb-4">
                              Nos siga nas redes sociais
                           </h3>
                           <p className="text-gray-600">
                              Acompanhe nosso trabalho e fique por dentro das
                              novidades
                           </p>
                        </div>

                        <div className="space-y-4">
                           <Link href={'#'} className="block group">
                              <div className="flex items-center gap-4 p-4 rounded-xl hover:bg-pink-50 transition-all duration-300 hover:shadow-md">
                                 <div className="w-14 h-14 bg-gradient-to-br from-pink-500/10 to-pink-600/10 rounded-xl flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                                    <InstagramLogoIcon
                                       size={28}
                                       className="text-pink-600"
                                    />
                                 </div>
                                 <div className="flex-1">
                                    <p className="font-semibold text-text_color text-base">
                                       Instagram
                                    </p>
                                    <p className="text-gray-600 text-sm">
                                       @conectasocial
                                    </p>
                                 </div>
                              </div>
                           </Link>

                           <Link href={'#'} className="block group">
                              <div className="flex items-center gap-4 p-4 rounded-xl hover:bg-red-50 transition-all duration-300 hover:shadow-md">
                                 <div className="w-14 h-14 bg-gradient-to-br from-red-500/10 to-red-600/10 rounded-xl flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                                    <YoutubeLogoIcon
                                       size={28}
                                       weight="fill"
                                       className="text-red-600"
                                    />
                                 </div>
                                 <div className="flex-1">
                                    <p className="font-semibold text-text_color text-base">
                                       YouTube
                                    </p>
                                    <p className="text-gray-600 text-sm">
                                       @conectasocial
                                    </p>
                                 </div>
                              </div>
                           </Link>

                           <Link href={'#'} className="block group">
                              <div className="flex items-center gap-4 p-4 rounded-xl hover:bg-blue-50 transition-all duration-300 hover:shadow-md">
                                 <div className="w-14 h-14 bg-gradient-to-br from-blue-500/10 to-blue-600/10 rounded-xl flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                                    <LinkedinLogoIcon
                                       size={28}
                                       weight="fill"
                                       className="text-blue-600"
                                    />
                                 </div>
                                 <div className="flex-1">
                                    <p className="font-semibold text-text_color text-base">
                                       LinkedIn
                                    </p>
                                    <p className="text-gray-600 text-sm">
                                       @conectasocial
                                    </p>
                                 </div>
                              </div>
                           </Link>

                           <Link href={'#'} className="block group">
                              <div className="flex items-center gap-4 p-4 rounded-xl hover:bg-green-50 transition-all duration-300 hover:shadow-md">
                                 <div className="w-14 h-14 bg-gradient-to-br from-green-500/10 to-green-600/10 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                                    <PhoneIcon
                                       size={28}
                                       weight="fill"
                                       className="text-green-600"
                                    />
                                 </div>
                                 <div className="flex-1">
                                    <p className="font-semibold text-text_color text-base">
                                       WhatsApp
                                    </p>
                                    <p className="text-gray-600 text-sm">
                                       +55 (15) 99999-9999
                                    </p>
                                 </div>
                              </div>
                           </Link>
                        </div>
                     </div>
                     <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
                        <div className="text-center">
                           <div className="w-20 h-20 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                              <svg
                                 className="w-10 h-10 text-primary"
                                 fill="none"
                                 stroke="currentColor"
                                 viewBox="0 0 24 24"
                              >
                                 <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                                 />
                              </svg>
                           </div>

                           <h3 className="text-2xl font-bold text-text_color mb-4">
                              Faça uma doação!
                           </h3>
                           <p className="text-gray-600 mb-8 text-lg leading-relaxed">
                              Gostou do nosso trabalho? Junte-se a nós e
                              contribua agora mesmo. Muito obrigado pelo apoio!
                           </p>

                           <div className="bg-gradient-to-br from-header_sidebar_color/50 to-tertiary/30 rounded-2xl p-6 mb-6 border border-primary/20">
                              <Image
                                 src="/images/fakeQRcode.png"
                                 alt="QR Code for Donation"
                                 width={150}
                                 height={150}
                                 style={{ objectFit: 'contain' }}
                                 className="mx-auto mb-4"
                              />
                              <p className="text-primary font-semibold text-lg">
                                 CHAVE PIX
                              </p>
                              <p className="text-primary/80 text-sm mt-2 mb-4">
                                 Escaneie o QR Code ou use a chave PIX
                              </p>

                              {/* Chave PIX para copiar */}
                              <div className="bg-white rounded-lg p-4 border border-primary/30 shadow-sm">
                                 <p className="text-xs text-primary mb-2 font-medium">
                                    Chave PIX:
                                 </p>
                                 <div className="flex items-center gap-2">
                                    <code className="text-sm font-mono bg-primary/5 text-text_color px-3 py-2 rounded flex-1 border border-primary/20">
                                       conectasocial@email.com
                                    </code>
                                    <button
                                       onClick={async () => {
                                          try {
                                             await navigator.clipboard.writeText(
                                                'conectasocial@email.com'
                                             );
                                             setPixCopied(true);
                                             setTimeout(
                                                () => setPixCopied(false),
                                                3000
                                             );
                                          } catch (err) {
                                             console.error(
                                                'Erro ao copiar:',
                                                err
                                             );
                                          }
                                       }}
                                       className={`flex items-center gap-2 px-4 py-2 rounded text-sm font-medium transition-all duration-200 shadow-sm hover:shadow-md ${
                                          pixCopied
                                             ? 'bg-success text-white'
                                             : 'bg-primary hover:bg-secondary text-white'
                                       }`}
                                    >
                                       {pixCopied ? (
                                          <>
                                             <CheckIcon
                                                size={16}
                                                weight="bold"
                                             />
                                             Copiado!
                                          </>
                                       ) : (
                                          'Copiar'
                                       )}
                                    </button>
                                 </div>
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </section>
         </main>
      </div>
   );
}
