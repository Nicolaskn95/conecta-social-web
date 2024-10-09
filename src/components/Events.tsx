import { Card, Text, Button } from "@radix-ui/themes";
import Image from "next/image";
import React from "react";

interface CardEventsProps {
  title: string;
  description: string;
  image: string;
}

const CardEvents = ({ title, description, image }: CardEventsProps) => {
  return (
    <Card className="w-80 mx-auto my-4">
      <Image
        src={image}
        alt={title}
        className="w-full h-36 object-cover"
        width={"100"}
        height={"100"}
      />
      <div className="p-4">
        <Text className="text-lg font-semibold">{title}</Text>
        <Text as="p" className="text-sm text-gray-600 mt-2">
          {description}
        </Text>
        <Button>Ver Mais</Button>
      </div>
    </Card>
  );
};

const Events = () => {
  return (
    <div className="flex justify-around my-12">
      <CardEvents
        title="Evento 1"
        description="Descrição do evento"
        image="/images/sea.jpg"
      />
      <CardEvents
        title="Evento 2"
        description="Descrição do evento"
        image="/images/sea.jpg"
      />
      <CardEvents
        title="Evento 3"
        description="Descrição do evento"
        image="/images/sea.jpg"
      />
    </div>
  );
};

export default Events;
