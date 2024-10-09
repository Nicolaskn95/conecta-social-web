import { Button, Card, Heading, Text } from "@radix-ui/themes";
import React from "react";

const Calendar = () => {
  const eventos = [
    { title: "Evento 1", date: "01/01/2024" },
    { title: "Evento 2", date: "15/01/2024" },
    { title: "Evento 3", date: "30/01/2024" },
  ];

  return (
    <div className="my-12">
      <Heading className="text-center mb-8">Próximos Eventos</Heading>
      <div className="max-w-4xl mx-auto space-y-4">
        {eventos.map((evento, index) => (
          <Card key={index}>
            <Text>{evento.title}</Text>
            <Text>{evento.date}</Text>
            <Button className="bg-gray-800 mt-2">Saiba Mais</Button>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Calendar;
