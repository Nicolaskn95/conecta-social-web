'use client';
import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import useAPI from '@/data/hooks/useAPI';
import { toast } from 'react-toastify';
import { EyeIcon, EyeSlashIcon, ArrowLeft } from '@phosphor-icons/react';

export default function ResetPassword() {
   const [password, setPassword] = useState<string>('');
   const [confirmPassword, setConfirmPassword] = useState<string>('');
   const [showPassword, setShowPassword] = useState<boolean>(false);
   const [showConfirmPassword, setShowConfirmPassword] =
      useState<boolean>(false);
   const [isLoading, setIsLoading] = useState<boolean>(false);
   const [isValidating, setIsValidating] = useState<boolean>(true);
   const [tokenValid, setTokenValid] = useState<boolean>(false);
   const [timeLeft, setTimeLeft] = useState<number>(0);
   const [email, setEmail] = useState<string>('');

   const { post, get } = useAPI();
   const router = useRouter();
   const searchParams = useSearchParams();
   const token = searchParams.get('token');

   useEffect(() => {
      if (!token) {
         toast.error('Token de redefinição não encontrado.');
         router.push('/forgot-password');
         return;
      }

      validateToken();
   }, [token]);

   useEffect(() => {
      let interval: NodeJS.Timeout;

      if (timeLeft > 0) {
         interval = setInterval(() => {
            setTimeLeft((prevTime) => prevTime - 1);
         }, 1000);
      }

      return () => {
         if (interval) clearInterval(interval);
      };
   }, [timeLeft]);

   const validateToken = async () => {
      if (!token) return;

      try {
         setIsValidating(true);
         const response = await get(
            `password-reset/validate-token?token=${token}`
         );

         if (response?.data?.valid) {
            setTokenValid(true);
            setEmail(response.data.email);

            // Calcular tempo restante (assumindo 10 minutos de validade)
            const tokenCreatedAt = new Date();
            const expiresAt = new Date(
               tokenCreatedAt.getTime() + 10 * 60 * 1000
            );
            const now = new Date();
            const remainingTime = Math.max(
               0,
               Math.floor((expiresAt.getTime() - now.getTime()) / 1000)
            );
            setTimeLeft(remainingTime);
         } else {
            setTokenValid(false);
            toast.error('Token inválido ou expirado.');
         }
      } catch (error: any) {
         console.error('Erro ao validar token:', error);
         setTokenValid(false);
         toast.error('Erro ao validar token. Tente novamente.');
      } finally {
         setIsValidating(false);
      }
   };

   const formatTime = (seconds: number): string => {
      const minutes = Math.floor(seconds / 60);
      const remainingSeconds = seconds % 60;
      return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
   };

   const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();

      if (!password || !confirmPassword) {
         toast.error('Por favor, preencha todos os campos.');
         return;
      }

      if (password !== confirmPassword) {
         toast.error('As senhas não coincidem.');
         return;
      }

      if (password.length < 6) {
         toast.error('A senha deve ter pelo menos 6 caracteres.');
         return;
      }

      try {
         setIsLoading(true);
         const response = await post('password-reset/reset', {
            token,
            newPassword: password,
         });

         if (response?.data) {
            toast.success('Senha redefinida com sucesso!');
            router.push('/login');
         }
      } catch (error: any) {
         console.error('Erro ao redefinir senha:', error);
         toast.error(
            error?.response?.data?.message ||
               'Erro ao redefinir senha. Tente novamente.'
         );
      } finally {
         setIsLoading(false);
      }
   };

   const handleBackToForgotPassword = () => {
      router.push('/forgot-password');
   };

   if (isValidating) {
      return (
         <div className="flex flex-col items-center place-content-center p-4 min-h-screen">
            <h3 className="title-gradient">Conecta Social</h3>
            <div className="card w-full max-w-md bg-white shadow-md rounded-lg p-8 mt-6 md:mx-2">
               <div className="text-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#387AA1] mx-auto mb-4"></div>
                  <p className="text-gray-600">Validando token...</p>
               </div>
            </div>
         </div>
      );
   }

   if (!tokenValid) {
      return (
         <div className="flex flex-col items-center place-content-center p-4 min-h-screen">
            <h3 className="title-gradient">Conecta Social</h3>
            <div className="card w-full max-w-md bg-white shadow-md rounded-lg p-8 mt-6 md:mx-2">
               <div className="text-center">
                  <div className="mb-6">
                     <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg
                           className="w-8 h-8 text-red-600"
                           fill="none"
                           stroke="currentColor"
                           viewBox="0 0 24 24"
                        >
                           <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M6 18L18 6M6 6l12 12"
                           />
                        </svg>
                     </div>
                     <h2 className="text-xl font-semibold text-gray-900 mb-2">
                        Token inválido ou expirado
                     </h2>
                     <p className="text-gray-600 mb-6">
                        O token de redefinição de senha é inválido ou já
                        expirou. Solicite um novo link de redefinição.
                     </p>
                  </div>

                  <button
                     onClick={handleBackToForgotPassword}
                     className="btn-primary w-full"
                  >
                     Solicitar novo link
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
                  onClick={handleBackToForgotPassword}
                  className="flex items-center text-[#387AA1] hover:text-[#090934] mb-4"
               >
                  <ArrowLeft size={20} className="mr-2" />
                  Voltar
               </button>
               <h2 className="text-xl font-semibold text-gray-900 mb-2">
                  Redefinir senha
               </h2>
               <p className="text-gray-600 mb-4">
                  Digite sua nova senha para <strong>{email}</strong>
               </p>

               {timeLeft > 0 && (
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mb-4">
                     <div className="flex items-center">
                        <svg
                           className="w-5 h-5 text-yellow-600 mr-2"
                           fill="none"
                           stroke="currentColor"
                           viewBox="0 0 24 24"
                        >
                           <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                           />
                        </svg>
                        <span className="text-sm text-yellow-800">
                           <strong>Expira em:</strong> {formatTime(timeLeft)}
                        </span>
                     </div>
                  </div>
               )}
            </div>

            <form onSubmit={handleSubmit}>
               <div className="mb-4">
                  <label
                     htmlFor="password"
                     className="block font-semibold mb-2"
                  >
                     Nova senha
                  </label>
                  <div className="relative">
                     <input
                        id="password"
                        type={showPassword ? 'text' : 'password'}
                        className="input w-full pr-10"
                        placeholder="Digite sua nova senha"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        disabled={isLoading}
                        required
                     />
                     <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute inset-y-0 right-0 flex items-center pr-3"
                        disabled={isLoading}
                     >
                        {showPassword ? (
                           <EyeIcon size={20} className="text-gray-500" />
                        ) : (
                           <EyeSlashIcon size={20} className="text-gray-500" />
                        )}
                     </button>
                  </div>
               </div>

               <div className="mb-6">
                  <label
                     htmlFor="confirmPassword"
                     className="block font-semibold mb-2"
                  >
                     Confirmar nova senha
                  </label>
                  <div className="relative">
                     <input
                        id="confirmPassword"
                        type={showConfirmPassword ? 'text' : 'password'}
                        className="input w-full pr-10"
                        placeholder="Confirme sua nova senha"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        disabled={isLoading}
                        required
                     />
                     <button
                        type="button"
                        onClick={() =>
                           setShowConfirmPassword(!showConfirmPassword)
                        }
                        className="absolute inset-y-0 right-0 flex items-center pr-3"
                        disabled={isLoading}
                     >
                        {showConfirmPassword ? (
                           <EyeIcon size={20} className="text-gray-500" />
                        ) : (
                           <EyeSlashIcon size={20} className="text-gray-500" />
                        )}
                     </button>
                  </div>
               </div>

               <button
                  type="submit"
                  className={`btn-primary w-full ${
                     isLoading || timeLeft <= 0
                        ? 'opacity-50 cursor-not-allowed'
                        : ''
                  }`}
                  disabled={isLoading || timeLeft <= 0}
               >
                  {isLoading ? 'Redefinindo...' : 'Redefinir senha'}
               </button>
            </form>

            {timeLeft <= 0 && (
               <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-sm text-red-800 text-center">
                     O token expirou. Solicite um novo link de redefinição.
                  </p>
               </div>
            )}
         </div>
      </div>
   );
}
