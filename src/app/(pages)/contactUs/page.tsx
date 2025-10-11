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
   const [showMobileNotification, setShowMobileNotification] = useState(false);

   const copyToClipboard = async (text: string) => {
      try {
         // Detectar se é iOS/Safari
         const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
         const isSafari =
            /Safari/.test(navigator.userAgent) &&
            !/Chrome/.test(navigator.userAgent);

         if (isIOS || isSafari) {
            // Método para iOS/Safari
            const textArea = document.createElement('textarea');
            textArea.value = text;
            textArea.style.position = 'fixed';
            textArea.style.left = '-999999px';
            textArea.style.top = '-999999px';
            textArea.style.opacity = '0';
            textArea.style.pointerEvents = 'none';
            document.body.appendChild(textArea);

            // Selecionar o texto
            textArea.select();
            textArea.setSelectionRange(0, 99999);

            try {
               const successful = document.execCommand('copy');
               if (successful) {
                  setPixCopied(true);
                  setShowMobileNotification(true);
                  setTimeout(() => {
                     setPixCopied(false);
                     setShowMobileNotification(false);
                  }, 3000);
               } else {
                  throw new Error('Copy command failed');
               }
            } catch (err) {
               console.error('Erro ao copiar no iOS/Safari:', err);
               // Mostrar notificação visual em vez de alert
               setShowMobileNotification(true);
               setTimeout(() => setShowMobileNotification(false), 5000);
            } finally {
               document.body.removeChild(textArea);
            }
         } else {
            // Para outros navegadores modernos
            if (navigator.clipboard && window.isSecureContext) {
               await navigator.clipboard.writeText(text);
               setPixCopied(true);
               setTimeout(() => setPixCopied(false), 3000);
            } else {
               // Fallback para navegadores mais antigos
               throw new Error('Clipboard API not available');
            }
         }
      } catch (err) {
         console.error('Erro ao copiar:', err);
         // Fallback: mostrar notificação visual
         setShowMobileNotification(true);
         setTimeout(() => setShowMobileNotification(false), 5000);
      }
   };
   return (
      <div className="min-h-screen bg-gradient-to-br from-white via-blue-50 to-white">
         {/* Notificação flutuante para mobile */}
         {showMobileNotification && (
            <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 bg-primary text-white px-6 py-3 rounded-lg shadow-lg animate-bounce">
               <div className="flex items-center gap-2">
                  <CheckIcon size={20} weight="bold" />
                  <span className="font-medium text-white">
                     Chave PIX copiada!
                  </span>
               </div>
            </div>
         )}

         <Banner imagePath="/images/contactUs1.jpg" />
         <main className="relative z-10">
            {/* Hero Section */}
            <section className="py-20 px-4 sm:px-6 lg:px-8">
               <div className="max-w-7xl mx-auto text-center">
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-text_color mb-4">
                     Fale Conosco
                  </h1>
                  <div className="w-24 h-1 bg-gradient-to-r from-primary to-secondary mx-auto mb-6"></div>
                  <p className="text-xl text-primary font-light tracking-wide">
                     Estamos aqui para conectar e transformar vidas juntos
                  </p>
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

                  <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
                     <div className="bg-white rounded-2xl p-4 sm:p-6 lg:p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 w-full overflow-hidden">
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

                  <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
                     <div className="bg-white rounded-2xl p-4 sm:p-6 lg:p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 w-full overflow-hidden">
                        <div className="text-center mb-6 lg:mb-8">
                           <h3 className="text-xl sm:text-2xl font-bold text-text_color mb-4">
                              Nos siga nas redes sociais
                           </h3>
                           <p className="text-gray-600 text-sm sm:text-base">
                              Acompanhe nosso trabalho e fique por dentro das
                              novidades
                           </p>
                        </div>

                        <div className="space-y-3 lg:space-y-4">
                           <Link href={'#'} className="block group">
                              <div className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 rounded-xl hover:bg-pink-50 transition-all duration-300 hover:shadow-md">
                                 <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-pink-500/10 to-pink-600/10 rounded-xl flex items-center justify-center group-hover:scale-105 transition-transform duration-300 flex-shrink-0">
                                    <InstagramLogoIcon
                                       size={24}
                                       className="text-pink-600 sm:w-7 sm:h-7"
                                    />
                                 </div>
                                 <div className="flex-1 min-w-0">
                                    <p className="font-semibold text-text_color text-sm sm:text-base truncate">
                                       Instagram
                                    </p>
                                    <p className="text-gray-600 text-xs sm:text-sm truncate">
                                       @conectasocial
                                    </p>
                                 </div>
                              </div>
                           </Link>

                           <Link href={'#'} className="block group">
                              <div className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 rounded-xl hover:bg-red-50 transition-all duration-300 hover:shadow-md">
                                 <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-red-500/10 to-red-600/10 rounded-xl flex items-center justify-center group-hover:scale-105 transition-transform duration-300 flex-shrink-0">
                                    <YoutubeLogoIcon
                                       size={24}
                                       weight="fill"
                                       className="text-red-600 sm:w-7 sm:h-7"
                                    />
                                 </div>
                                 <div className="flex-1 min-w-0">
                                    <p className="font-semibold text-text_color text-sm sm:text-base truncate">
                                       YouTube
                                    </p>
                                    <p className="text-gray-600 text-xs sm:text-sm truncate">
                                       @conectasocial
                                    </p>
                                 </div>
                              </div>
                           </Link>

                           <Link href={'#'} className="block group">
                              <div className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 rounded-xl hover:bg-blue-50 transition-all duration-300 hover:shadow-md">
                                 <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-blue-500/10 to-blue-600/10 rounded-xl flex items-center justify-center group-hover:scale-105 transition-transform duration-300 flex-shrink-0">
                                    <LinkedinLogoIcon
                                       size={24}
                                       weight="fill"
                                       className="text-blue-600 sm:w-7 sm:h-7"
                                    />
                                 </div>
                                 <div className="flex-1 min-w-0">
                                    <p className="font-semibold text-text_color text-sm sm:text-base truncate">
                                       LinkedIn
                                    </p>
                                    <p className="text-gray-600 text-xs sm:text-sm truncate">
                                       @conectasocial
                                    </p>
                                 </div>
                              </div>
                           </Link>

                           <Link href={'#'} className="block group">
                              <div className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 rounded-xl hover:bg-green-50 transition-all duration-300 hover:shadow-md">
                                 <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-green-500/10 to-green-600/10 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 flex-shrink-0">
                                    <PhoneIcon
                                       size={24}
                                       weight="fill"
                                       className="text-green-600 sm:w-7 sm:h-7"
                                    />
                                 </div>
                                 <div className="flex-1 min-w-0">
                                    <p className="font-semibold text-text_color text-sm sm:text-base truncate">
                                       WhatsApp
                                    </p>
                                    <p className="text-gray-600 text-xs sm:text-sm truncate">
                                       +55 (15) 99999-9999
                                    </p>
                                 </div>
                              </div>
                           </Link>
                        </div>
                     </div>
                     <div className="bg-white rounded-2xl p-4 sm:p-6 lg:p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 w-full overflow-hidden">
                        <div className="text-center">
                           <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
                              <svg
                                 className="w-8 h-8 sm:w-10 sm:h-10 text-primary"
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

                           <h3 className="text-xl sm:text-2xl font-bold text-text_color mb-3 sm:mb-4">
                              Faça uma doação!
                           </h3>
                           <p className="text-gray-600 mb-6 sm:mb-8 text-base sm:text-lg leading-relaxed">
                              Gostou do nosso trabalho? Junte-se a nós e
                              contribua agora mesmo. Muito obrigado pelo apoio!
                           </p>

                           <div className="bg-gradient-to-br from-header_sidebar_color/50 to-tertiary/30 rounded-2xl p-4 sm:p-6 mb-4 sm:mb-6 border border-primary/20">
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
                                 <p className="text-xs text-primary mb-3 font-medium">
                                    Chave PIX:
                                 </p>

                                 {/* Layout responsivo */}
                                 <div className="flex flex-col sm:flex-row gap-3 sm:gap-2">
                                    <code className="text-xs sm:text-sm font-mono bg-primary/5 text-text_color px-3 py-2 rounded border border-primary/20 flex-1 break-all">
                                       conectasocial@email.com
                                    </code>
                                    <button
                                       onClick={() =>
                                          copyToClipboard(
                                             'conectasocial@email.com'
                                          )
                                       }
                                       className={`flex items-center justify-center gap-2 px-4 py-2 rounded text-sm font-medium transition-all duration-200 shadow-sm hover:shadow-md w-full sm:w-auto ${
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
