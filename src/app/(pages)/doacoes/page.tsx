'use client';
import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import {
   Elements,
   CardElement,
   useStripe,
   useElements,
} from '@stripe/react-stripe-js';
import { toast } from 'react-toastify';
import {
   Heart,
   CreditCard,
   Shield,
   Gift,
   Users,
   HandHeart,
} from '@phosphor-icons/react';
import Breadcrumb from '@/components/Breadcrumb/Breadcrumb';

// Configuração do Stripe
const stripePromise = loadStripe(
   process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || 'pk_test_...'
);

interface PaymentFormProps {
   onSuccess: () => void;
   onError: (error: string) => void;
}

const PaymentForm: React.FC<PaymentFormProps> = ({ onSuccess, onError }) => {
   const stripe = useStripe();
   const elements = useElements();
   const [amount, setAmount] = useState<number>(50);
   const [donorName, setDonorName] = useState<string>('');
   const [donorEmail, setDonorEmail] = useState<string>('');
   const [isProcessing, setIsProcessing] = useState<boolean>(false);
   const [isAnonymous, setIsAnonymous] = useState<boolean>(false);

   const predefinedAmounts = [25, 50, 100, 250, 500, 1000];

   const handleSubmit = async (event: React.FormEvent) => {
      event.preventDefault();

      if (!stripe || !elements) {
         return;
      }

      if (!isAnonymous && (!donorName.trim() || !donorEmail.trim())) {
         onError('Por favor, preencha todos os campos obrigatórios.');
         return;
      }

      if (amount < 10) {
         onError('O valor mínimo para doação é R$ 10,00.');
         return;
      }

      setIsProcessing(true);

      try {
         const cardElement = elements.getElement(CardElement);

         if (!cardElement) {
            throw new Error('Elemento do cartão não encontrado');
         }

         // Simular processamento do pagamento
         await new Promise((resolve) => setTimeout(resolve, 2000));

         // Em um cenário real, você faria:
         // const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
         //   payment_method: {
         //     card: cardElement,
         //     billing_details: {
         //       name: isAnonymous ? 'Doador Anônimo' : donorName,
         //       email: isAnonymous ? 'anonymous@donation.com' : donorEmail,
         //     },
         //   },
         // });

         // Simular sucesso
         toast.success(
            `Doação de R$ ${amount.toFixed(2)} realizada com sucesso!`
         );
         onSuccess();
      } catch (error) {
         console.error('Erro no pagamento:', error);
         onError('Erro ao processar o pagamento. Tente novamente.');
      } finally {
         setIsProcessing(false);
      }
   };

   return (
      <div className="max-w-2xl mx-auto">
         <form onSubmit={handleSubmit} className="space-y-6">
            {/* Informações do Doador */}
            <div className="bg-white rounded-lg shadow-md p-6">
               <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                  <Users size={20} />
                  Informações do Doador
               </h3>

               <div className="mb-4">
                  <label className="flex items-center gap-2">
                     <input
                        type="checkbox"
                        checked={isAnonymous}
                        onChange={(e) => setIsAnonymous(e.target.checked)}
                        className="rounded border-gray-300"
                     />
                     <span className="text-sm text-gray-600">
                        Fazer doação anônima
                     </span>
                  </label>
               </div>

               {!isAnonymous && (
                  <>
                     <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                           Nome Completo *
                        </label>
                        <input
                           type="text"
                           value={donorName}
                           onChange={(e) => setDonorName(e.target.value)}
                           className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                           placeholder="Seu nome completo"
                           required
                        />
                     </div>

                     <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                           E-mail *
                        </label>
                        <input
                           type="email"
                           value={donorEmail}
                           onChange={(e) => setDonorEmail(e.target.value)}
                           className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                           placeholder="seu@email.com"
                           required
                        />
                     </div>
                  </>
               )}
            </div>

            {/* Valor da Doação */}
            <div className="bg-white rounded-lg shadow-md p-6">
               <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                  <Gift size={20} />
                  Valor da Doação
               </h3>

               <div className="grid grid-cols-3 gap-3 mb-4">
                  {predefinedAmounts.map((predefinedAmount) => (
                     <button
                        key={predefinedAmount}
                        type="button"
                        onClick={() => setAmount(predefinedAmount)}
                        className={`p-3 text-sm rounded-lg border-2 transition-all ${
                           amount === predefinedAmount
                              ? 'bg-primary text-white border-primary'
                              : 'bg-white text-gray-700 border-gray-300 hover:border-primary hover:bg-primary/5'
                        }`}
                     >
                        R$ {predefinedAmount}
                     </button>
                  ))}
               </div>

               <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                     Valor Personalizado (R$)
                  </label>
                  <input
                     type="number"
                     value={amount}
                     onChange={(e) => setAmount(Number(e.target.value))}
                     className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                     min="10"
                     max="10000"
                     step="0.01"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                     Valor mínimo: R$ 10,00 | Valor máximo: R$ 10.000,00
                  </p>
               </div>
            </div>

            {/* Informações do Cartão */}
            <div className="bg-white rounded-lg shadow-md p-6">
               <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                  <CreditCard size={20} />
                  Informações do Cartão
               </h3>

               <div className="p-4 border border-gray-300 rounded-md bg-gray-50">
                  <CardElement
                     options={{
                        style: {
                           base: {
                              fontSize: '16px',
                              color: '#424770',
                              '::placeholder': {
                                 color: '#aab7c4',
                              },
                           },
                           invalid: {
                              color: '#9e2146',
                           },
                        },
                     }}
                  />
               </div>

               <div className="mt-4 flex items-center gap-2 text-sm text-gray-600">
                  <Shield size={16} />
                  <span>Seus dados estão protegidos com criptografia SSL</span>
               </div>
            </div>

            {/* Botão de Pagamento */}
            <div className="text-center">
               <button
                  type="submit"
                  className="btn-primary flex items-center justify-center gap-3 text-lg px-8 py-4 w-full max-w-md mx-auto"
                  disabled={!stripe || isProcessing}
               >
                  {isProcessing ? (
                     <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                        Processando Pagamento...
                     </>
                  ) : (
                     <>
                        <Heart size={24} />
                        Doar R$ {amount.toFixed(2)}
                     </>
                  )}
               </button>
            </div>
         </form>
      </div>
   );
};

const StripePage: React.FC = () => {
   const [paymentSuccess, setPaymentSuccess] = useState<boolean>(false);

   const breadcrumbItems = [
      { label: 'Início', href: '/dashboard' },
      { label: 'Doações' },
   ];

   const handleSuccess = () => {
      setPaymentSuccess(true);
      setTimeout(() => {
         setPaymentSuccess(false);
      }, 5000);
   };

   const handleError = (errorMessage: string) => {
      toast.error(errorMessage);
   };

   return (
      <div className="min-h-screen p-4 bg-gray-100">
         <div className="max-w-6xl mx-auto">
            {/* Header */}
            <div className="mb-8">
               <Breadcrumb items={breadcrumbItems} />
               <div className="mt-4 text-center">
                  <h1 className="text-3xl font-bold text-gray-800 mb-2">
                     Faça sua Doação
                  </h1>
                  <p className="text-gray-600 text-lg">
                     Sua contribuição faz a diferença na vida de muitas pessoas
                  </p>
               </div>
            </div>

            {paymentSuccess ? (
               /* Tela de Sucesso */
               <div className="max-w-2xl mx-auto">
                  <div className="bg-white rounded-lg shadow-lg p-8 text-center">
                     <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-6">
                        <Heart className="h-8 w-8 text-green-600" />
                     </div>
                     <h2 className="text-2xl font-bold text-gray-900 mb-4">
                        Doação Realizada com Sucesso!
                     </h2>
                     <p className="text-gray-600 mb-6">
                        Obrigado pela sua generosidade! Sua doação será
                        utilizada para ajudar famílias e pessoas em situação de
                        vulnerabilidade.
                     </p>
                     <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                        <p className="text-sm text-green-800">
                           <strong>
                              Você receberá um e-mail de confirmação
                           </strong>{' '}
                           com os detalhes da sua doação e como ela será
                           utilizada.
                        </p>
                     </div>
                  </div>
               </div>
            ) : (
               /* Formulário de Doação */
               <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  {/* Informações sobre a ONG */}
                  <div className="lg:col-span-1">
                     <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                           <HandHeart size={20} />
                           Sobre o Conecta Social
                        </h3>
                        <p className="text-gray-600 text-sm mb-4">
                           Somos uma organização sem fins lucrativos dedicada a
                           conectar pessoas em situação de vulnerabilidade com
                           recursos e apoio necessários para uma vida melhor.
                        </p>
                        <div className="space-y-3">
                           <div className="flex items-center gap-2 text-sm text-gray-600">
                              <div className="w-2 h-2 bg-primary rounded-full"></div>
                              <span>+500 famílias atendidas</span>
                           </div>
                           <div className="flex items-center gap-2 text-sm text-gray-600">
                              <div className="w-2 h-2 bg-primary rounded-full"></div>
                              <span>+1000 doações realizadas</span>
                           </div>
                           <div className="flex items-center gap-2 text-sm text-gray-600">
                              <div className="w-2 h-2 bg-primary rounded-full"></div>
                              <span>+200 voluntários ativos</span>
                           </div>
                        </div>
                     </div>

                     <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                        <h4 className="font-semibold text-blue-800 mb-2">
                           Como sua doação é utilizada:
                        </h4>
                        <ul className="text-sm text-blue-700 space-y-1">
                           <li>• 60% - Alimentos e roupas</li>
                           <li>• 25% - Apoio educacional</li>
                           <li>• 10% - Assistência médica</li>
                           <li>• 5% - Operações administrativas</li>
                        </ul>
                     </div>
                  </div>

                  {/* Formulário de Pagamento */}
                  <div className="lg:col-span-2">
                     <Elements stripe={stripePromise}>
                        <PaymentForm
                           onSuccess={handleSuccess}
                           onError={handleError}
                        />
                     </Elements>
                  </div>
               </div>
            )}
         </div>
      </div>
   );
};

export default StripePage;
