import { instagramHTML } from "../InstagramHTML";

const Events = () => {
  return (
    <div className="flex-col justify-items-center my-12 p-10">
      <div className="flex-col mb-4 text-center">
        <h1 className="text-3xl mb-2">Eventos</h1>
        <p className="text-[#387AA1] text-xl">Últimos Eventos</p>
      </div>
      <div className="flex gap-8">
        {instagramHTML.map((htmlString, index) => (
          <div key={index} dangerouslySetInnerHTML={{ __html: htmlString }} />
        ))}
      </div>
    </div>
  );
};

export default Events;
