'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import useAPI from '@/data/hooks/useAPI';
import { toast } from 'react-toastify';
import { ArrowLeft } from '@phosphor-icons/react';

export default function ForgotPassword() {
   const [email, setEmail] = useState<string>('');
   const [isLoading, setIsLoading] = useState<boolean>(false);
   const [emailSent, setEmailSent] = useState<boolean>(false);
   const { post } = useAPI();
   const router = useRouter();

   const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();

      if (!email) {
         toast.error('Por favor, insira seu e-mail.');
         return;
      }

      try {
         setIsLoading(true);
         const response = await post('password-reset/request', { email });

         if (response?.data) {
            setEmailSent(true);
            toast.success(
               'Se o e-mail estiver cadastrado, você receberá um link para redefinir sua senha.'
            );
         }
      } catch (error: any) {
         console.error('Erro ao solicitar reset de senha:', error);
         toast.error(
            error?.response?.data?.message ||
               'Erro ao solicitar reset de senha. Tente novamente.'
         );
      } finally {
         setIsLoading(false);
      }
   };

   const handleBackToLogin = () => {
      router.push('/login');
   };

   if (emailSent) {
      return (
         <div className="flex flex-col items-center place-content-center p-4 min-h-screen">
            <h3 className="title-gradient">Conecta Social</h3>
            <div className="card w-full max-w-md bg-white shadow-md rounded-lg p-8 mt-6 md:mx-2">
               <div className="text-center">
                  <div className="mb-6">
                     <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg
                           className="w-8 h-8 text-green-600"
                           fill="none"
                           stroke="currentColor"
                           viewBox="0 0 24 24"
                        >
                           <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M5 13l4 4L19 7"
                           />
                        </svg>
                     </div>
                     <h2 className="text-xl font-semibold text-gray-900 mb-2">
                        E-mail enviado!
                     </h2>
                     <p className="text-gray-600 mb-4">
                        Se o e-mail <strong>{email}</strong> estiver cadastrado
                        em nosso sistema, você receberá um link para redefinir
                        sua senha.
                     </p>
                     <p className="text-sm text-gray-500 mb-6">
                        Verifique sua caixa de entrada e também a pasta de spam.
                        O link expira em 10 minutos.
                     </p>
                  </div>

                  <button
                     onClick={handleBackToLogin}
                     className="btn-primary w-full mb-4"
                  >
                     Voltar ao Login
                  </button>

                  <button
                     onClick={() => {
                        setEmailSent(false);
                        setEmail('');
                     }}
                     className="text-[#387AA1] underline hover:text-[#090934] text-sm"
                  >
                     Enviar novamente
                  </button>
               </div>
            </div>
         </div>
      );
   }

   return (
      <div className="flex flex-col items-center place-content-center p-4 min-h-screen">
         <h3 className="title-gradient">Conecta Social</h3>
         <div className="card w-full max-w-md bg-white shadow-md rounded-lg p-8 mt-6 md:mx-2">
            <div className="mb-6">
               <button
                  onClick={handleBackToLogin}
                  className="flex items-center text-[#387AA1] hover:text-[#090934] mb-4"
               >
                  <ArrowLeft size={20} className="mr-2" />
                  Voltar ao login
               </button>
               <h2 className="text-xl font-semibold text-gray-900 mb-2">
                  Esqueci minha senha
               </h2>
               <p className="text-gray-600">
                  Digite seu e-mail para receber um link de redefinição de
                  senha.
               </p>
            </div>

            <form onSubmit={handleSubmit}>
               <div className="mb-4">
                  <label htmlFor="email" className="block font-semibold mb-2">
                     E-Mail
                  </label>
                  <input
                     id="email"
                     type="email"
                     className="input w-full"
                     placeholder="Digite seu e-mail"
                     value={email}
                     onChange={(e) => setEmail(e.target.value)}
                     disabled={isLoading}
                     required
                  />
               </div>

               <button
                  type="submit"
                  className={`btn-primary w-full ${
                     isLoading ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                  disabled={isLoading}
               >
                  {isLoading ? 'Enviando...' : 'Enviar link de redefinição'}
               </button>
            </form>
         </div>
      </div>
   );
}
