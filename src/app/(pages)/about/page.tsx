import Banner from "@/components/LandingPage/Banner";
import Image from "next/image";

export default function About() {
  return (
    <>
      <Banner imagePath="/images/Rectangle.png" />
      <article className="flex flex-col items-start px-4 py-8 md:px-16 lg:px-36">
        <div className="flex flex-col self-center text-center">
          <h1 className="title mt-8 mb-2">Sobre</h1>
          <p className="sub-title mb-4">História</p>
        </div>
        <section className="text-justify mb-8 leading-relaxed">
          <p className="mb-4">
            A história do Projeto Sementes do Amanhã começou com três amigos
            que, ao reencontrarem-se na faculdade, lembraram-se de um evento
            marcante que viveram anos antes: uma visita a uma comunidade
            carente, onde conheceram crianças cheias de sonhos, mas sem o apoio
            necessário para realizá-los. Tocadas por essa realidade, essas
            crianças despertaram neles o desejo de fazer algo maior.
          </p>
          <p className="mb-4">
            Com o apoio de familiares e amigos, os três fundadores deram vida ao
            projeto em 2020. O objetivo sempre foi claro: criar um espaço seguro
            e acolhedor onde crianças em situação de vulnerabilidade pudessem
            receber apoio educacional, alimentação e, principalmente, carinho e
            esperança para o futuro. Ao longo dos anos, o Projeto Sementes do
            Amanhã cresceu e se tornou um ponto de luz na comunidade, oferecendo
            atividades educativas, culturais e emocionais que visam transformar
            vidas.
          </p>
          <p className="mb-4">
            Hoje, graças ao apoio de voluntários e doadores, o projeto já ajudou
            centenas de crianças, proporcionando um ambiente onde elas podem
            sonhar e cultivar um futuro melhor. Nossa missão é clara e
            inabalável: plante hoje a semente do amanhã para colhermos um futuro
            mais justo e solidário.
          </p>
        </section>

        <section className="flex flex-col self-start items-center md:flex-row gap-8 mt-4">
          <Image
            src={"/images/about1.png"}
            width={500}
            height={500}
            alt="Sobre"
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
        </section>

        <section className="mt-12">
          <h2 className="mb-6">Nossa Missão</h2>
          <p className="text-start leading-relaxed">
            Promover o desenvolvimento integral das crianças, oferecendo
            recursos para que cada uma possa explorar seu potencial e construir
            uma trajetória de sucesso. Queremos ser mais do que um suporte
            temporário; almejamos criar raízes e plantar sementes que floresçam
            ao longo da vida.
          </p>
        </section>

        <section className="mt-12">
          <h2 className=" mb-6">Nossos Valores</h2>
          <ul className="list-disc list-inside mx-auto text-gray-700 space-y-2">
            <li>
              <strong className="font-semibold">Empatia:</strong> Cada criança é
              acolhida com respeito e compreensão, valorizando suas experiências
              únicas.
            </li>
            <li>
              <strong className="font-semibold">Inclusão:</strong> Trabalhamos
              para criar um espaço onde todas as crianças e suas famílias se
              sintam pertencentes, independentemente de suas origens.
            </li>
            <li>
              <strong className="font-semibold">Sustentabilidade:</strong>{" "}
              Nossos programas são pensados para gerar impacto duradouro,
              focando em educação, habilidades práticas e desenvolvimento
              emocional.
            </li>
            <li>
              <strong className="font-semibold">Comunidade:</strong> Acreditamos
              no poder da coletividade e incentivamos a participação da
              comunidade em nossos projetos, fortalecendo laços e criando uma
              rede de apoio.
            </li>
          </ul>
        </section>

        <section className="mt-12 text-gray-800">
          <h2 className="font-bold mb-6">Nossos Programas</h2>
          <ul className="list-disc list-inside mx-auto text-gray-700 space-y-2">
            <p>
              Para alcançar nosso propósito, contamos com uma série de programas
              desenvolvidos especialmente para apoiar o crescimento das crianças
              em todas as esferas da vida:
            </p>
            <li>
              <strong className="font-semibold">Apoio Educacional:</strong>{" "}
              Reforço escolar e desenvolvimento socioemocional.
            </li>
            <li>
              <strong className="font-semibold">Cultura e Lazer:</strong>{" "}
              Eventos culturais, oficinas e atividades recreativas.
            </li>
            <li>
              <strong className="font-semibold">Assistência Básica:</strong>{" "}
              Acesso a alimentação e suprimentos básicos para as crianças.
            </li>
          </ul>
        </section>

        <section className="mt-12">
          <h2 className="mb-6">Junte-se a Nós</h2>
          <p className="mx-auto leading-relaxed">
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
