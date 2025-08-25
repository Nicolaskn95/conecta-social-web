import Banner from '@/components/LandingPage/Banner';
import Image from 'next/image';

export default function About() {
   return (
      <>
         <Banner imagePath="/images/carousel3.png" />

         {/* Modern About Page Content */}
         <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
            {/* Hero Section */}
            <section className="relative py-20 px-4 md:px-16 lg:px-36">
               <div className="max-w-6xl mx-auto">
                  <div className="text-center mb-16">
                     <h1 className="text-2xl md:text-7xl lg:text-7xl font-black mb-6">
                        <span className="text bg-clip-text">Sobre</span>
                     </h1>
                     <div className="w-32 h-1 bg-gradient-to-r from-[#40789b] to-[#1ea1ff] mx-auto rounded-full shadow-lg"></div>
                     <p className="text-2xl md:text-3xl text-gray-600 mt-6 font-light">
                        Nossa História de Transformação
                     </p>
                  </div>
               </div>
            </section>

            {/* Story Section */}
            <section className="py-16 px-4 md:px-16 lg:px-36 bg-white">
               <div className="max-w-6xl mx-auto">
                  <div className="grid lg:grid-cols-2 gap-12 items-center">
                     <div className="space-y-6">
                        <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-8">
                           <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                              Nossa História
                           </span>
                        </h2>
                        <div className="space-y-6 text-gray-700 leading-relaxed text-lg">
                           <p>
                              A história do Projeto Sementes do Amanhã teve
                              início com três amigos que, ao reencontrarem-se na
                              faculdade, recordaram-se de um evento marcante
                              vivenciado anos anteriores: uma visita a uma
                              comunidade carente, onde conheceram crianças
                              repletas de sonhos, porém sem o apoio necessário
                              para realizá-los.
                           </p>
                           <p>
                              Com o apoio de familiares e amigos, os três
                              fundadores deram vida ao projeto em 2020. O
                              objetivo sempre foi claro: criar um espaço seguro
                              e acolhedor onde crianças em situação de
                              vulnerabilidade pudessem receber apoio
                              educacional, alimentação e, principalmente,
                              carinho e esperança para o futuro.
                           </p>
                           <p>
                              Atualmente, graças ao apoio de voluntários e
                              doadores, o projeto já auxiliou centenas de
                              crianças, proporcionando um ambiente onde elas
                              podem sonhar e cultivar um futuro melhor.
                           </p>
                        </div>
                     </div>
                     <div className="relative">
                        <div className="backdrop-blur-sm bg-white/10 rounded-3xl p-4 border border-white/20 shadow-2xl">
                           <Image
                              src={'/images/about1.png'}
                              width={600}
                              height={600}
                              alt="Sobre"
                              className="rounded-2xl shadow-xl"
                           />
                        </div>
                     </div>
                  </div>
               </div>
            </section>

            {/* Mission Section */}
            <section className="py-20 px-4 md:px-16 lg:px-36 bg-gradient-to-br from-[#40789b]/5 to-[#1ea1ff]/5">
               <div className="max-w-4xl mx-auto text-center">
                  <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-8">
                     <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                        Nossa Missão
                     </span>
                  </h2>
                  <div className="backdrop-blur-sm bg-white/80 rounded-3xl p-8 border border-white/20 shadow-xl">
                     <p className="text-xl leading-relaxed text-gray-700">
                        Promover o desenvolvimento integral das crianças,
                        oferecendo recursos para que cada uma possa explorar seu
                        potencial e construir uma trajetória de sucesso.
                        Pretendemos ser mais do que um suporte temporário;
                        almejamos criar raízes e plantar sementes que floresçam
                        ao longo da vida.
                     </p>
                  </div>
               </div>
            </section>

            {/* Values Section */}
            <section className="py-20 px-4 md:px-16 lg:px-36 bg-white">
               <div className="max-w-6xl mx-auto">
                  <h2 className="text-4xl md:text-5xl font-bold text-center text-gray-800 mb-16">
                     <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                        Nossos Valores
                     </span>
                  </h2>
                  <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                     {[
                        {
                           title: 'Empatia',
                           description:
                              'Cada criança é acolhida com respeito e compreensão, valorizando suas experiências únicas.',
                        },
                        {
                           title: 'Inclusão',
                           description:
                              'Trabalhamos para criar um espaço onde todas as crianças e suas famílias se sintam pertencentes.',
                        },
                        {
                           title: 'Sustentabilidade',
                           description:
                              'Nossos programas são pensados para gerar impacto duradouro, focando em educação e desenvolvimento.',
                        },
                        {
                           title: 'Comunidade',
                           description:
                              'Acreditamos no poder da coletividade e incentivamos a participação da comunidade.',
                        },
                     ].map((value, index) => (
                        <div
                           key={index}
                           className="backdrop-blur-sm bg-white/80 rounded-2xl p-6 border border-white/20 shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105"
                        >
                           <div className="w-12 h-12 bg-gradient-to-r from-[#40789b] to-[#1ea1ff] rounded-full flex items-center justify-center mb-4">
                              <span className="text-white font-bold text-lg">
                                 {index + 1}
                              </span>
                           </div>
                           <h3 className="text-xl font-bold text-gray-800 mb-3">
                              {value.title}
                           </h3>
                           <p className="text-gray-600 leading-relaxed">
                              {value.description}
                           </p>
                        </div>
                     ))}
                  </div>
               </div>
            </section>

            {/* Programs Section */}
            <section className="py-20 px-4 md:px-16 lg:px-36 bg-gradient-to-br from-[#40789b]/5 to-[#1ea1ff]/5">
               <div className="max-w-6xl mx-auto">
                  <h2 className="text-4xl md:text-5xl font-bold text-center text-gray-800 mb-16">
                     <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                        Nossos Programas
                     </span>
                  </h2>
                  <div className="grid md:grid-cols-3 gap-8">
                     {[
                        {
                           title: 'Apoio Educacional',
                           description:
                              'Reforço escolar e desenvolvimento socioemocional para crianças em situação de vulnerabilidade.',
                        },
                        {
                           title: 'Cultura e Lazer',
                           description:
                              'Eventos culturais, oficinas e atividades recreativas que enriquecem a experiência das crianças.',
                        },
                        {
                           title: 'Assistência Básica',
                           description:
                              'Acesso a alimentação e suprimentos básicos essenciais para o desenvolvimento saudável.',
                        },
                     ].map((program, index) => (
                        <div
                           key={index}
                           className="backdrop-blur-sm bg-white/80 rounded-2xl p-8 border border-white/20 shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105"
                        >
                           <div className="w-16 h-16 bg-gradient-to-r from-[#40789b] to-[#1ea1ff] rounded-2xl flex items-center justify-center mb-6">
                              <span className="text-white font-bold text-2xl">
                                 {index + 1}
                              </span>
                           </div>
                           <h3 className="text-2xl font-bold text-gray-800 mb-4">
                              {program.title}
                           </h3>
                           <p className="text-gray-600 leading-relaxed">
                              {program.description}
                           </p>
                        </div>
                     ))}
                  </div>
               </div>
            </section>

            {/* Join Us Section */}
            <section className="py-20 px-4 md:px-16 lg:px-36 bg-white">
               <div className="max-w-4xl mx-auto text-center">
                  <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-8">
                     <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                        Junte-se a Nós
                     </span>
                  </h2>
                  <div className="backdrop-blur-sm bg-gradient-to-r from-[#40789b]/10 to-[#1ea1ff]/10 rounded-3xl p-8 border border-white/20 shadow-xl">
                     <p className="text-xl leading-relaxed text-gray-700 mb-8">
                        Queremos que você também faça parte dessa jornada de
                        transformação! Seja como voluntário, parceiro ou doador,
                        toda contribuição é essencial para continuarmos
                        oferecendo um futuro mais justo para nossas crianças.
                     </p>
                     <button className="bg-gradient-to-r from-primary to-secondary text-white px-8 py-4 rounded-2xl font-semibold text-lg hover:shadow-xl transition-all duration-500 hover:scale-105">
                        Fazer Parte
                     </button>
                  </div>
               </div>
            </section>
         </div>
      </>
   );
}
