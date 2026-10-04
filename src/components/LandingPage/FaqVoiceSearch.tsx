'use client';

import { FormEvent, useEffect, useRef, useState } from 'react';
import {
   CheckCircleIcon,
   MagnifyingGlassIcon,
   MicrophoneIcon,
   WarningCircleIcon,
} from '@phosphor-icons/react';
import {
   FaqChatHistoryMessage,
   FaqChatbotResponse,
   FaqSearchResult,
   voiceSearchService,
} from '@/data/services/voiceSearchService';

interface BrowserSpeechRecognition extends EventTarget {
   lang: string;
   continuous: boolean;
   interimResults: boolean;
   maxAlternatives: number;
   start: () => void;
   stop: () => void;
   abort: () => void;
   onstart: (() => void) | null;
   onend: (() => void) | null;
   onresult: ((event: BrowserSpeechRecognitionEvent) => void) | null;
   onerror: ((event: BrowserSpeechRecognitionErrorEvent) => void) | null;
}

interface BrowserSpeechRecognitionEvent extends Event {
   results: SpeechRecognitionResultList;
}

interface BrowserSpeechRecognitionErrorEvent extends Event {
   error: string;
   message?: string;
}

declare global {
   interface Window {
      SpeechRecognition?: new () => BrowserSpeechRecognition;
      webkitSpeechRecognition?: new () => BrowserSpeechRecognition;
   }
}

const exampleQueries = [
   'como faço para doar',
   'quero ser voluntário',
   'qual é o endereço',
   'qual é a chave pix',
];

const intentLabels: Record<string, string> = {
   doacao: 'Doação',
   voluntariado: 'Voluntariado',
   eventos: 'Eventos',
   localizacao: 'Localização',
   contato: 'Contato',
   horario: 'Horário',
   pix: 'PIX',
   desconhecida: 'Não identificada',
};

const sourceLabels: Record<string, string> = {
   llm: 'Resposta assistida por IA',
   faq_fallback: 'Resposta FAQ local',
};

const showDebugInfo =
   (process.env.NEXT_PUBLIC_FAQ_VOICE_SEARCH_DEBUG ?? '').trim().length > 0;

const MAX_HISTORY_MESSAGES = 6;
type ChatMode = 'rules' | 'llm';

function getFallbackReferences(): FaqSearchResult[] {
   return [
      {
         id: 'faq-fallback',
         category: 'geral',
         question: 'Não encontramos uma resposta exata.',
         answer:
            'Tente perguntar sobre doações, voluntariado, eventos, localização, horário, contato ou chave PIX.',
         score: 0,
      },
   ];
}

export default function FaqVoiceSearch() {
   const [query, setQuery] = useState('');
   const [response, setResponse] = useState<FaqChatbotResponse | null>(null);
   const [chatHistory, setChatHistory] = useState<FaqChatHistoryMessage[]>([]);
   const [chatMode, setChatMode] = useState<ChatMode>('rules');
   const [isSpeechSupported, setIsSpeechSupported] = useState(true);
   const [isListening, setIsListening] = useState(false);
   const [isSubmitting, setIsSubmitting] = useState(false);
   const [error, setError] = useState<string | null>(null);
   const recognitionRef = useRef<BrowserSpeechRecognition | null>(null);

   useEffect(() => {
      setIsSpeechSupported(
         typeof window !== 'undefined' &&
            Boolean(window.SpeechRecognition || window.webkitSpeechRecognition)
      );

      return () => {
         recognitionRef.current?.abort();
      };
   }, []);

   const askFaq = async (value: string) => {
      const trimmedValue = value.trim();

      if (!trimmedValue) {
         setError('Digite uma pergunta ou use o microfone para pesquisar.');
         return;
      }

      setIsSubmitting(true);
      setError(null);

      try {
         if (chatMode === 'rules') {
            const faqResponse = await voiceSearchService.searchFaq(trimmedValue);
            const references = faqResponse.results.slice(0, 3);
            const best = references[0];
            const answer = best?.answer
               ? best.answer
               : 'Não foi possível identificar a intenção. Tente perguntar sobre doação, voluntariado, eventos, localização, horário, contato ou PIX.';

            const mappedResponse: FaqChatbotResponse = {
               query: faqResponse.query,
               answer,
               source: 'faq_fallback',
               intent: faqResponse.intent,
               references: references.length ? references : getFallbackReferences(),
               contextReset: false,
            };

            setResponse(mappedResponse);
            setChatHistory((prev) => {
               const updatedHistory: FaqChatHistoryMessage[] = [
                  ...prev,
                  { role: 'user', content: trimmedValue },
                  { role: 'assistant', content: answer },
               ];

               return updatedHistory.slice(-MAX_HISTORY_MESSAGES);
            });

            return;
         }

         const history = chatHistory.slice(-MAX_HISTORY_MESSAGES);
         const result = await voiceSearchService.chatFaq(trimmedValue, history);
         setResponse(result);
         if (result.contextReset) {
            setChatHistory([
               { role: 'user', content: trimmedValue },
               { role: 'assistant', content: result.answer },
            ]);
         } else {
            setChatHistory((prev) => {
               const updatedHistory: FaqChatHistoryMessage[] = [
                  ...prev,
                  { role: 'user', content: trimmedValue },
                  { role: 'assistant', content: result.answer },
               ];

               return updatedHistory.slice(-MAX_HISTORY_MESSAGES);
            });
         }
      } catch (err) {
         console.error('Erro ao consultar chatbot:', err);
         setError(
            'Não foi possível consultar a FAQ agora. Verifique se a API está rodando.'
         );
      } finally {
         setIsSubmitting(false);
      }
   };

   const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      void askFaq(query);
   };

   const handleStopListening = () => {
      recognitionRef.current?.stop();
      setIsListening(false);
   };

   const handleStartListening = () => {
      if (isListening) {
         handleStopListening();
         return;
      }

      const SpeechRecognitionConstructor =
         window.SpeechRecognition || window.webkitSpeechRecognition;

      if (!SpeechRecognitionConstructor) {
         setIsSpeechSupported(false);
         setError(
            'Não foi possível usar o microfone neste navegador. Você ainda pode pesquisar digitando.'
         );
         return;
      }

      const recognition = new SpeechRecognitionConstructor();
      recognition.lang = 'pt-BR';
      recognition.continuous = false;
      recognition.interimResults = true;
      recognition.maxAlternatives = 1;

      let hasSubmitted = false;
      let latestTranscript = '';

      recognition.onstart = () => {
         setIsListening(true);
         setError(null);
      };

      recognition.onresult = (event) => {
         let interim = '';
         let final = '';

         for (let i = 0; i < event.results.length; i++) {
            const item = event.results[i];
            const text = item[0]?.transcript ?? '';
            if (item.isFinal) {
               final += text;
            } else {
               interim += text;
            }
         }

         const currentSpeech = (final || interim).trim();
         if (currentSpeech) {
            latestTranscript = currentSpeech;
            setQuery(currentSpeech);
         }

         if (final.trim() && !hasSubmitted) {
            hasSubmitted = true;
            setIsListening(false);
            recognition.stop();
            void askFaq(final.trim());
         }
      };

      recognition.onerror = (event) => {
         console.warn('SpeechRecognition error:', event.error, event);
         setIsListening(false);

         // Interrupções normais (usuário clicou para cancelar ou fechou o microfone)
         if (event.error === 'aborted') {
            return;
         }

         if (event.error === 'not-allowed' || event.error === 'service-not-allowed') {
            setError(
               'Permissão do microfone negada. Clique no ícone de cadeado/permissões na barra de endereço do navegador para permitir o acesso ao microfone.'
            );
            return;
         }

         if (event.error === 'no-speech') {
            setError(
               'Nenhum som foi detectado pelo microfone. Verifique se o microfone está conectado e desmutado, e tente falar novamente.'
            );
            return;
         }

         if (event.error === 'network') {
            setError(
               'Não foi possível conectar ao serviço de voz do navegador. Se estiver usando o Brave, habilite "Google Services for Speech" em brave://settings/privacy, ou verifique sua conexão.'
            );
            return;
         }

         if (event.error === 'audio-capture') {
            setError(
               'Nenhum microfone encontrado ou o dispositivo de áudio está sendo usado por outro aplicativo.'
            );
            return;
         }

         setError(
            'Não foi possível entender sua fala. Tente novamente falando pausadamente ou pesquise digitando.'
         );
      };

      recognition.onend = () => {
         setIsListening(false);
         // Se captou alguma transcrição mas não disparou isFinal antes do encerramento
         if (!hasSubmitted && latestTranscript.trim()) {
            hasSubmitted = true;
            void askFaq(latestTranscript.trim());
         }
      };

      recognitionRef.current = recognition;
      try {
         recognition.start();
      } catch (err) {
         console.error('Erro ao iniciar reconhecimento de voz:', err);
         setIsListening(false);
         setError(
            'Não foi possível iniciar o microfone. Você ainda pode pesquisar digitando.'
         );
      }
   };

   const statusLabel = !isSpeechSupported
      ? 'Navegador sem suporte à voz'
      : isListening
      ? 'Ouvindo...'
      : isSubmitting
      ? 'Buscando resposta...'
      : 'Aguardando busca';

   const changeChatMode = (mode: ChatMode) => {
      if (mode === chatMode) {
         return;
      }

      setChatMode(mode);
      setChatHistory([]);
      setResponse(null);
      setError(null);
   };

   return (
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-50 to-indigo-50">
         <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
               <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-text_color mb-4">
                  Perguntas frequentes
               </h2>
               <div className="w-24 h-1 bg-gradient-to-r from-primary to-secondary mx-auto mb-6"></div>
               <p className="text-xl text-primary font-light tracking-wide">
                  Digite sua dúvida ou toque no microfone para falar
               </p>
            </div>

            <div className="grid lg:grid-cols-[0.95fr_1.05fr] gap-8 lg:gap-12 items-start">
               <div className="bg-white rounded-2xl p-5 sm:p-8 shadow-lg border border-gray-100">
                  <div className="flex items-center justify-between gap-4 mb-6">
                     <div>
                        <h3 className="text-2xl font-bold text-text_color">
                           Como podemos ajudar?
                        </h3>
                        <p className="text-gray-600 mt-2">
                           Encontre respostas sobre doações, voluntariado,
                           eventos, localização e contato.
                        </p>
                     </div>
                     <span
                        className={`text-sm font-semibold px-3 py-2 rounded-full ${
                           isListening
                              ? 'bg-red-50 text-red-600'
                              : 'bg-primary/10 text-primary'
                        }`}
                     >
                        {statusLabel}
                     </span>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-4">
                     <div>
                        <p className="text-sm font-semibold text-text_color mb-2">
                           Modo do chatbot
                        </p>
                        <div className="flex flex-wrap gap-2">
                           <button
                              type="button"
                              onClick={() => changeChatMode('rules')}
                              className={`rounded-full px-4 py-2 text-sm font-semibold border transition-colors duration-200 ${
                                 chatMode === 'rules'
                                    ? 'bg-primary text-white border-primary'
                                    : 'bg-white text-primary border-primary/40'
                              }`}
                           >
                              Regras + TF-IDF + SVM
                           </button>
                           <button
                              type="button"
                              onClick={() => changeChatMode('llm')}
                              className={`rounded-full px-4 py-2 text-sm font-semibold border transition-colors duration-200 ${
                                 chatMode === 'llm'
                                    ? 'bg-secondary text-white border-secondary'
                                    : 'bg-white text-secondary border-secondary/40'
                              }`}
                           >
                              IA (Maritaca)
                           </button>
                        </div>
                     </div>

                     <label
                        htmlFor="faq-search"
                        className="block font-semibold text-text_color"
                     >
                        O que você quer saber?
                     </label>
                     <div className="flex flex-col sm:flex-row gap-3">
                        <div className="flex items-center flex-1 rounded-xl border border-primary/30 bg-white px-4 py-3 focus-within:ring-2 focus-within:ring-primary/20">
                           <MagnifyingGlassIcon
                              size={22}
                              className="text-primary mr-2 flex-shrink-0"
                           />
                           <input
                              id="faq-search"
                              type="text"
                              value={query}
                              onChange={(event) => setQuery(event.target.value)}
                              placeholder="Ex.: como faço para doar?"
                              className="w-full outline-none text-text_color placeholder:text-primary/40"
                           />
                        </div>
                        <button
                           type="button"
                           onClick={handleStartListening}
                           disabled={isSubmitting}
                           aria-pressed={isListening}
                           className={`flex items-center justify-center gap-2 rounded-xl px-5 py-3 font-semibold transition-all duration-300 ${
                              isListening
                                 ? 'bg-red-600 text-white shadow-lg'
                                 : 'bg-secondary text-white hover:bg-primary hover:shadow-lg'
                           } disabled:cursor-not-allowed disabled:bg-gray-300 disabled:text-gray-600`}
                        >
                           <MicrophoneIcon size={22} weight="fill" />
                           {isListening ? 'Parar' : 'Falar'}
                        </button>
                        <button
                           type="submit"
                           disabled={isSubmitting}
                           className="rounded-xl px-5 py-3 font-semibold bg-primary text-white hover:bg-secondary transition-all duration-300 disabled:cursor-not-allowed disabled:bg-gray-300"
                        >
                           {isSubmitting ? 'Buscando...' : 'Buscar'}
                        </button>
                     </div>
                  </form>

                  {!isSpeechSupported && (
                     <div className="mt-5 flex gap-3 rounded-xl border border-amber-200 bg-amber-50 p-4">
                        <WarningCircleIcon
                           size={24}
                           className="text-amber-600 flex-shrink-0"
                        />
                        <p className="text-sm text-amber-800">
                           Seu navegador não permite busca por voz aqui. Você
                           ainda pode pesquisar digitando sua pergunta.
                        </p>
                     </div>
                  )}

                  {error && (
                     <div className="mt-5 flex gap-3 rounded-xl border border-red-200 bg-red-50 p-4">
                        <WarningCircleIcon
                           size={24}
                           className="text-red-600 flex-shrink-0"
                        />
                        <p className="text-sm text-red-700">{error}</p>
                     </div>
                  )}

                  <div className="mt-6">
                     <p className="text-sm font-semibold text-text_color mb-3">
                        Perguntas rápidas:
                     </p>
                     <div className="flex flex-wrap gap-2">
                        {exampleQueries.map((example) => (
                           <button
                              key={example}
                              type="button"
                              onClick={() => {
                                 setQuery(example);
                                 void askFaq(example);
                              }}
                              className="rounded-full bg-primary/10 px-3 py-2 text-sm text-primary hover:bg-primary hover:text-white transition-colors duration-200"
                           >
                              {example}
                           </button>
                        ))}
                     </div>
                  </div>
               </div>

               <div className="space-y-5">
                  {response && (
                     <div className="bg-white rounded-2xl p-5 sm:p-8 shadow-lg border border-gray-100">
                        {showDebugInfo && (
                           <div className="grid sm:grid-cols-3 gap-4 mb-6">
                              <div className="rounded-xl bg-primary/5 p-4">
                                 <p className="text-xs font-semibold text-primary uppercase">
                                    Você disse
                                 </p>
                                 <p className="text-text_color mt-2">
                                    {response.query}
                                 </p>
                              </div>
                              <div className="rounded-xl bg-secondary/10 p-4">
                                 <p className="text-xs font-semibold text-primary uppercase">
                                    Intenção
                                 </p>
                                 <p className="text-text_color mt-2">
                                    {intentLabels[response.intent] ??
                                       response.intent}
                                 </p>
                              </div>
                              <div className="rounded-xl bg-green-50 p-4">
                                 <p className="text-xs font-semibold text-green-700 uppercase">
                                    Origem
                                 </p>
                                 <p className="text-text_color mt-2">
                                    {sourceLabels[response.source] ??
                                       response.source}
                                 </p>
                              </div>
                           </div>
                        )}

                        <article className="rounded-2xl border border-primary/10 bg-gradient-to-br from-white to-blue-50/60 p-5">
                           <div className="flex items-start gap-3">
                              <CheckCircleIcon
                                 size={24}
                                 weight="fill"
                                 className="text-primary flex-shrink-0 mt-1"
                              />
                              <div className="w-full">
                                 <div className="flex flex-wrap items-center gap-2 mb-2">
                                    <h4 className="text-lg font-bold text-text_color">
                                       Resposta
                                    </h4>
                                    <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-primary border border-primary/20">
                                       {sourceLabels[response.source] ??
                                          response.source}
                                    </span>
                                 </div>
                                 <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                                    {response.answer}
                                 </p>
                              </div>
                           </div>
                        </article>

                        {response.references.length > 0 && (
                           <div className="mt-5 space-y-3">
                              <p className="text-sm font-semibold text-text_color">
                                 Referências usadas
                              </p>
                              {response.references.map((result) => (
                                 <article
                                    key={result.id}
                                    className="rounded-xl border border-primary/10 bg-white p-4"
                                 >
                                    <div className="flex flex-wrap items-center gap-2 mb-1">
                                       <h5 className="font-semibold text-text_color">
                                          {result.question}
                                       </h5>
                                       <span className="rounded-full bg-primary/10 px-2 py-1 text-xs font-semibold text-primary">
                                          {intentLabels[result.category] ??
                                             result.category}
                                       </span>
                                    </div>
                                    <p className="text-sm text-gray-600">
                                       {result.answer}
                                    </p>
                                 </article>
                              ))}
                           </div>
                        )}
                     </div>
                  )}

                  {!response && (
                     <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 text-center">
                        <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                           <MicrophoneIcon
                              size={32}
                              weight="fill"
                              className="text-primary"
                           />
                        </div>
                        <h3 className="text-2xl font-bold text-text_color mb-3">
                           Faça uma pergunta
                        </h3>
                        <p className="text-gray-600">
                           As respostas mais úteis aparecerão aqui assim que
                           você fizer uma pergunta.
                        </p>
                     </div>
                  )}
               </div>
            </div>
         </div>
      </section>
   );
}
