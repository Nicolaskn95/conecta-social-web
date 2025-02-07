'use client';
import React from 'react';
import Lottie from 'lottie-react';
import loading from '@public/animations/loading.json';
import WIP from '@public/animations/WIP.json';

interface LottieAnimationProps {
   status: 'loading' | 'WIP';
}

function LottieAnimation({ status }: LottieAnimationProps) {
   return (
      <div style={{ position: 'relative', display: 'inline-block' }}>
         <div className="flex justify-center mb-4">
            <Lottie
               animationData={status === 'loading' ? loading : WIP}
               className="w-auto h-auto"
               loop
               autoplay
            />
         </div>
         {status === 'WIP' && (
            <p
               style={{
                  position: 'absolute',
                  top: '50%',
                  left: '58%',
                  transform: 'translate(-50%, -50%)',
                  fontSize: '30px',
                  fontWeight: 'bold',
                  color: '#000', // Escolha uma cor que contraste com o fundo
                  pointerEvents: 'none', // Para o texto não interferir em cliques na animação
               }}
            >
               EM CONSTRUÇÃO
            </p>
         )}
      </div>
   );
}

export default LottieAnimation;
