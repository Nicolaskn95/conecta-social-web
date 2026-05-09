import { BaseService } from './baseService';

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

interface FaqVoiceSearchApiResponse {
   code: number;
   success: boolean;
   message: string;
   data: FaqVoiceSearchResponse;
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
}

export const voiceSearchService = new VoiceSearchService();
