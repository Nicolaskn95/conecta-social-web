'use client';
import { Suspense, useEffect, useState, useRef } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { EyeIcon, EyeSlashIcon } from '@phosphor-icons/react';
import useAPI from '@/data/hooks/useAPI';
import useAuth from '@/data/hooks/useAuth';
import LottieAnimation from '@/components/shared/LottieAnimation';

export default function Login() {
   const [showPassword, setShowPassword] = useState<boolean>(false);
   const [password, setPassword] = useState<string>('');
   const [email, setEmail] = useState<string>('');
   const { post } = useAPI();
   const { user, login } = useAuth();
   const router = useRouter();
   const param = useSearchParams();
   const buttonRef = useRef<HTMLButtonElement>(null);

   useEffect(() => {
      if (user?.email) {
         const destination = param.get('destination');
         router.push(destination ? destination : '/dashboard');
      }
   }, [router, user, param]);

   const togglePasswordVisibility = () => {
      setShowPassword(!showPassword);
   };

   const handlePasswordKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Tab') {
         e.preventDefault();
         buttonRef.current?.focus();
      }
   };

   const handleFormSubmit = async () => {
      const dataLogin = {
         email,
         password,
      };

      const response: any = await post('auth/login', dataLogin);

      const accessToken = response?.data?.access_token;
      login(accessToken);

      if (accessToken) {
         login(accessToken);
      } else {
         console.error('Access token não encontrado na resposta:', response);
      }
   };

   return (
      <div className="flex flex-col items-center justify-center my-14 mx-4">
         <h3 className="title-gradient">Conecta Social</h3>
         <div className="card w-full > max-w-md bg-white shadow-md rounded-lg p-8 mt-6 md:mx-2">
            <form
               onSubmit={(e) => {
                  e.preventDefault();
                  handleFormSubmit();
               }}
            >
               <p className="font-semibold mb-2">E-Mail</p>
               <input
                  type="email"
                  className="input mb-4"
                  placeholder="Digite seu e-mail"
                  onChange={(e) => setEmail(e.target.value)}
               />

               <p className="font-semibold mb-2">Senha</p>
               <div className="relative">
                  <input
                     type={showPassword ? 'text' : 'password'}
                     className="input"
                     placeholder="Digite sua senha"
                     onChange={(e) => setPassword(e.target.value)}
                     onKeyDown={handlePasswordKeyDown}
                  />
                  <button
                     type="button"
                     onClick={togglePasswordVisibility}
                     className="absolute inset-y-0 right-0 flex items-center pr-3"
                  >
                     {showPassword ? (
                        <EyeIcon size={20} className="text-gray-500" />
                     ) : (
                        <EyeSlashIcon size={20} className="text-gray-500" />
                     )}
                  </button>
               </div>

               <button
                  type="submit"
                  onClick={handleFormSubmit}
                  className="btn-primary w-full mt-4"
                  ref={buttonRef}
               >
                  Entrar
               </button>
            </form>
            <p className="text-start text-[#387AA1] mt-4 underline cursor-pointer hover:text-[#090934]">
               Esqueci minha senha
            </p>
         </div>
      </div>
   );
}
