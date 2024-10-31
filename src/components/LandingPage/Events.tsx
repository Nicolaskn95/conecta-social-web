import { instagramHTML } from "../InstagramHTML";

const Events = () => {
  return (
    <section id="events" className="flex flex-col justify-items-center my-12">
      <div className="flex flex-col mb-4 text-center">
        <h1 className="text-3xl mb-2">Eventos</h1>
        <p className="text-[#387AA1] text-xl">Últimos Eventos</p>
      </div>
      <div className="flex flex-wrap justify-center md:gap-16 lg:gap-32 md:flex-col lg:flex-row">
        {instagramHTML.map((htmlString, index) => (
          <div
            className="mb-6"
            key={index}
            dangerouslySetInnerHTML={{ __html: htmlString }}
          />
        ))}
      </div>
    </section>
  );
};

export default Events;
