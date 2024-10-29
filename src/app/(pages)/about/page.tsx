import Banner from "@/components/LandingPage/Banner";
import Image from "next/image";

export default function About() {
  return (
    <>
      <Banner />
      <article className="flex flex-col items-center justify-center px-4 py-8 md:px-16 lg:px-32">
        <h1 className="text-4xl font-bold text-center mt-8 mb-4 text-gray-800">
          Sobre
        </h1>
        <p>História</p>
        <section className="text-center max-w-2xl mb-8 text-gray-700 leading-relaxed">
          <p className="text-lg">
            A história do Projeto Sementes do Amanhã começou com três amigos
            que, ao reencontrarem-se na faculdade, lembraram-se de um evento
            marcante que viveram anos antes: uma visita a uma comunidade
            carente, onde conheceram crianças cheias de sonhos, mas sem o apoio
            necessário para realizá-los.
          </p>
        </section>

        <div className="flex flex-col md:flex-row items-center gap-8 mt-4">
          <Image
            src={"/images/about1.png"}
            width={400}
            height={400}
            alt="Sobre"
            className="rounded-lg shadow-lg"
          />
          <div className="max-w-md text-gray-700 leading-relaxed">
            <p>
              Desde sua criação, o Projeto Sementes do Amanhã tem se dedicado a
              combater a desigualdade e a criar oportunidades reais para
              crianças e suas famílias. Com uma abordagem focada na educação, no
              desenvolvimento social e no bem-estar emocional, acreditamos que
              cada criança pode se tornar agente de sua própria transformação.
            </p>
          </div>
        </div>

        <section className="w-full mt-12 text-gray-800">
          <h2 className="text-3xl font-semibold text-center mb-6">
            Nossa Missão
          </h2>
          <p className="text-center max-w-2xl mx-auto leading-relaxed">
            Promover o desenvolvimento integral das crianças, oferecendo
            recursos para que cada uma possa explorar seu potencial e construir
            uma trajetória de sucesso.
          </p>
        </section>

        <section className="w-full mt-12 text-gray-800">
          <h2 className="text-3xl font-semibold text-center mb-6">
            Nossos Valores
          </h2>
          <ul className="list-disc list-inside max-w-xl mx-auto text-gray-700 space-y-2">
            <li>
              Empatia: Cada criança é acolhida com respeito e compreensão.
            </li>
            <li>
              Inclusão: Trabalhamos para criar um espaço onde todas as crianças
              se sintam pertencentes.
            </li>
            <li>
              Sustentabilidade: Focamos em programas que geram impacto
              duradouro.
            </li>
            <li>
              Comunidade: Incentivamos a participação da comunidade em nossos
              projetos.
            </li>
          </ul>
        </section>

        <section className="w-full mt-12 text-gray-800">
          <h2 className="text-3xl font-semibold text-center mb-6">
            Nossos Programas
          </h2>
          <ul className="list-disc list-inside max-w-2xl mx-auto text-gray-700 space-y-2">
            <li>
              <strong>Apoio Educacional:</strong> Reforço escolar e
              desenvolvimento socioemocional.
            </li>
            <li>
              <strong>Cultura e Lazer:</strong> Eventos culturais, oficinas e
              atividades recreativas.
            </li>
            <li>
              <strong>Assistência Básica:</strong> Acesso a alimentação e
              suprimentos básicos para as crianças.
            </li>
          </ul>
        </section>

        <section className="w-full mt-12 text-gray-800">
          <h2 className="text-3xl font-semibold text-center mb-6">
            Junte-se a Nós
          </h2>
          <p className="text-center max-w-2xl mx-auto leading-relaxed text-gray-700">
            Queremos que você também faça parte dessa jornada de transformação!
            Seja como voluntário, parceiro ou doador, toda contribuição é
            essencial para continuarmos oferecendo um futuro mais justo para
            nossas crianças. Juntos, podemos plantar esperança e cultivar o
            amanhã que desejamos ver.
          </p>
        </section>
      </article>
    </>
  );
}
