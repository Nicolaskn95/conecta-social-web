import { useState } from 'react';

interface CepData {
   cep: string;
   logradouro: string;
   complemento: string;
   bairro: string;
   localidade: string;
   uf: string;
   ibge: string;
   gia: string;
   ddd: string;
   siafi: string;
   erro?: boolean;
   estado: string;
}

export default function useCEP() {
   const [data, setData] = useState<CepData | null>(null);
   const [loading, setLoading] = useState(false);
   const [error, setError] = useState<string | null>(null);

   const fetchCEP = async (cep: string) => {
      setLoading(true);
      setError(null);
      setData(null);

      // Remove non-numeric characters
      const cleanCep = cep.replace(/\D/g, '');

      if (cleanCep.length !== 8) {
         setError('CEP inválido. Deve conter 8 dígitos.');
         setLoading(false);
         return;
      }

      try {
         const response = await fetch(
            `https://viacep.com.br/ws/${cleanCep}/json/`
         );
         const result: CepData = await response.json();
         if (result.erro) {
            setError('CEP não encontrado.');
            setData(null);
         } else {
            setData(result);
         }
      } catch (err) {
         setError('Erro ao buscar o CEP.');
         setData(null);
      } finally {
         setLoading(false);
      }
   };

   return { data, loading, error, fetchCEP };
}
