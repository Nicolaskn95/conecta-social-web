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
import { CreditCard, Heart, X } from '@phosphor-icons/react';
import Modal from '@/components/Modal/Modal';

// Configuração do Stripe
const stripePromise = loadStripe(
   process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || 'pk_test_...'
);

interface DonationPaymentProps {
   isOpen: boolean;
   onClose: () => void;
   donationName?: string;
}

interface PaymentFormProps {
   onSuccess: () => void;
   onError: (error: string) => void;
   donationName?: string;
}

const PaymentForm: React.FC<PaymentFormProps> = ({
   onSuccess,
   onError,
   donationName,
}) => {
   const stripe = useStripe();
   const elements = useElements();
   const [amount, setAmount] = useState<number>(50);
   const [donorName, setDonorName] = useState<string>('');
   const [donorEmail, setDonorEmail] = useState<string>('');
   const [isProcessing, setIsProcessing] = useState<boolean>(false);

   const predefinedAmounts = [25, 50, 100, 250, 500];

   const handleSubmit = async (event: React.FormEvent) => {
      event.preventDefault();

      if (!stripe || !elements) {
         return;
      }

      if (!donorName.trim() || !donorEmail.trim()) {
         onError('Por favor, preencha todos os campos obrigatórios.');
         return;
      }

      if (amount < 10) {
         onError('O valor mínimo para doação é R$ 10,00.');
         return;
      }

      setIsProcessing(true);

      try {
         // Aqui você faria uma chamada para seu backend para criar o PaymentIntent
         // Por enquanto, vamos simular um pagamento bem-sucedido

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
         //       name: donorName,
         //       email: donorEmail,
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
      <form onSubmit={handleSubmit} className="space-y-6">
         <div>
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

         <div>
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

         <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
               Valor da Doação (R$)
            </label>
            <div className="grid grid-cols-3 gap-2 mb-3">
               {predefinedAmounts.map((predefinedAmount) => (
                  <button
                     key={predefinedAmount}
                     type="button"
                     onClick={() => setAmount(predefinedAmount)}
                     className={`p-2 text-sm rounded-md border ${
                        amount === predefinedAmount
                           ? 'bg-primary text-white border-primary'
                           : 'bg-white text-gray-700 border-gray-300 hover:border-primary'
                     }`}
                  >
                     R$ {predefinedAmount}
                  </button>
               ))}
            </div>
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

         <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
               Informações do Cartão
            </label>
            <div className="p-3 border border-gray-300 rounded-md">
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
         </div>

         <div className="flex justify-end space-x-3">
            <button
               type="button"
               onClick={() => onError('Pagamento cancelado')}
               className="btn-secondary"
               disabled={isProcessing}
            >
               Cancelar
            </button>
            <button
               type="submit"
               className="btn-primary flex items-center gap-2"
               disabled={!stripe || isProcessing}
            >
               {isProcessing ? (
                  <>
                     <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                     Processando...
                  </>
               ) : (
                  <>
                     <Heart size={20} />
                     Doar R$ {amount.toFixed(2)}
                  </>
               )}
            </button>
         </div>
      </form>
   );
};

const DonationPayment: React.FC<DonationPaymentProps> = ({
   isOpen,
   onClose,
   donationName,
}) => {
   const [paymentSuccess, setPaymentSuccess] = useState<boolean>(false);
   const [error, setError] = useState<string>('');

   const handleSuccess = () => {
      setPaymentSuccess(true);
      setTimeout(() => {
         setPaymentSuccess(false);
         onClose();
      }, 3000);
   };

   const handleError = (errorMessage: string) => {
      setError(errorMessage);
      toast.error(errorMessage);
   };

   const handleClose = () => {
      setError('');
      setPaymentSuccess(false);
      onClose();
   };

   return (
      <Modal isOpen={isOpen} onClose={handleClose} title="Fazer Doação">
         <div className="space-y-4">
            {paymentSuccess ? (
               <div className="text-center py-8">
                  <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-4">
                     <Heart className="h-6 w-6 text-green-600" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                     Doação Realizada com Sucesso!
                  </h3>
                  <p className="text-sm text-gray-500">
                     Obrigado pela sua contribuição. Sua doação faz a diferença!
                  </p>
               </div>
            ) : (
               <>
                  {donationName && (
                     <div className="bg-blue-50 border border-blue-200 rounded-md p-3">
                        <p className="text-sm text-blue-800">
                           <strong>Doação para:</strong> {donationName}
                        </p>
                     </div>
                  )}

                  <Elements stripe={stripePromise}>
                     <PaymentForm
                        onSuccess={handleSuccess}
                        onError={handleError}
                        donationName={donationName}
                     />
                  </Elements>
               </>
            )}
         </div>
      </Modal>
   );
};

export default DonationPayment;
