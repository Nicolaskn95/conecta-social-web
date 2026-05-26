import { ApiRequestError, BaseService } from './baseService';

export type FaqSearchIntent =
   | 'doacao'
   | 'voluntariado'
   | 'eventos'
   | 'localizacao'
   | 'contato'
   | 'horario'
   | 'pix'
   | 'desconhecida';

export interface FaqSearchResult {
   id: string;
   category: string;
   question: string;
   answer: string;
   score: number;
}

export interface FaqVoiceSearchResponse {
   query: string;
   normalizedQuery: string;
   tokens: string[];
   intent: FaqSearchIntent;
   results: FaqSearchResult[];
}

export type FaqChatbotSource = 'llm' | 'faq_fallback';

export interface FaqChatHistoryMessage {
   role: 'user' | 'assistant';
   content: string;
}

export interface FaqChatbotResponse {
   query: string;
   answer: string;
   source: FaqChatbotSource;
   intent: FaqSearchIntent;
   references: FaqSearchResult[];
   contextReset?: boolean;
}

const MAX_CHAT_HISTORY_MESSAGES = 6;
const MAX_CHAT_HISTORY_MESSAGE_CHARS = 500;

interface FaqVoiceSearchApiResponse {
   code: number;
   success: boolean;
   message: string;
   data: FaqVoiceSearchResponse;
}

interface FaqChatbotApiResponse {
   code: number;
   success: boolean;
   message: string;
   data: FaqChatbotResponse;
}

function normalizeHistory(history: FaqChatHistoryMessage[]) {
   if (!Array.isArray(history)) {
      return [];
   }

   return history
      .filter(
         (message) =>
            (message?.role === 'user' || message?.role === 'assistant') &&
            typeof message.content === 'string' &&
            message.content.trim().length > 0
      )
      .slice(-MAX_CHAT_HISTORY_MESSAGES)
      .map((message) => ({
         role: message.role,
         content: message.content.trim().slice(0, MAX_CHAT_HISTORY_MESSAGE_CHARS),
      }));
}

function shouldResetContext(error: unknown) {
   if (!(error instanceof ApiRequestError)) {
      return false;
   }

   if (![400, 413, 422].includes(error.status)) {
      return false;
   }

   const details = `${error.message} ${JSON.stringify(error.body ?? {})}`.toLowerCase();
   return (
      details.includes('history') ||
      details.includes('context') ||
      details.includes('token') ||
      details.includes('max')
   );
}

class VoiceSearchService extends BaseService<never> {
   constructor() {
      super('voice-search');
   }

   async searchFaq(query: string): Promise<FaqVoiceSearchResponse> {
      const response = await this.request<FaqVoiceSearchApiResponse>(
         `/${this.entityPath}/faq`,
         {
            method: 'POST',
            body: JSON.stringify({ query }),
         },
         {
            auth: 'none',
            redirectOn401: false,
         }
      );

      return response.data;
   }

   async chatFaq(
      query: string,
      history: FaqChatHistoryMessage[] = []
   ): Promise<FaqChatbotResponse> {
      const normalizedQuery = query.trim().slice(0, 500);
      const normalizedHistory = normalizeHistory(history);

      try {
         const response = await this.request<FaqChatbotApiResponse>(
            `/${this.entityPath}/chatbot`,
            {
               method: 'POST',
               body: JSON.stringify({
                  query: normalizedQuery,
                  history: normalizedHistory,
               }),
            },
            {
               auth: 'none',
               redirectOn401: false,
            }
         );

         return {
            ...response.data,
            contextReset: false,
         };
      } catch (error) {
         if (!normalizedHistory.length || !shouldResetContext(error)) {
            throw error;
         }

         const retryResponse = await this.request<FaqChatbotApiResponse>(
            `/${this.entityPath}/chatbot`,
            {
               method: 'POST',
               body: JSON.stringify({ query: normalizedQuery, history: [] }),
            },
            {
               auth: 'none',
               redirectOn401: false,
            }
         );

         return {
            ...retryResponse.data,
            contextReset: true,
         };
      }
   }
}

export const voiceSearchService = new VoiceSearchService();
