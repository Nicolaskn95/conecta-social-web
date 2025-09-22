import { loadStripe } from '@stripe/stripe-js';

// Chave pública do Stripe (em produção, use variáveis de ambiente)
const stripePublishableKey =
   process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || 'pk_test_...';

export const stripePromise = loadStripe(stripePublishableKey);

// Configurações do Stripe
export const stripeConfig = {
   // Moeda padrão
   currency: 'BRL',

   // País padrão
   country: 'BR',

   // Configurações de localização
   locale: 'pt-BR',

   // Configurações de pagamento
   paymentMethods: {
      card: true,
      pix: true, // PIX para Brasil
      boleto: true, // Boleto para Brasil
   },

   // Valores padrão para doações
   defaultDonationAmounts: [25, 50, 100, 250, 500],

   // Valor mínimo de doação
   minDonationAmount: 10,

   // Valor máximo de doação
   maxDonationAmount: 10000,
};
