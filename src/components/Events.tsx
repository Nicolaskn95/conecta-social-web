import React from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
} from "@mui/material";

interface CardEventsProps {
  title: string;
  description: string;
  image: string;
}

const CardEvents = ({ title, description, image }: CardEventsProps) => {
  return (
    <Card className="w-80 mx-auto my-4">
      <CardMedia component="img" height="140" image={image} alt={title} />
      <CardContent>
        <Typography variant="h6">{title}</Typography>
        <Typography variant="body2" color="textSecondary">
          {description}
        </Typography>
        <Button variant="contained" className="bg-gray-800 mt-2">
          Ver Mais
        </Button>
      </CardContent>
    </Card>
  );
};

const Events = () => {
  return (
    <div className="flex justify-around my-12">
      <CardEvents
        title="Evento 1"
        description="Descrição do evento"
        image="https://as2.ftcdn.net/v2/jpg/03/54/94/49/1000_F_354944901_SzU5v3KbpDM0752i9d7C3gSMjFexisw1.jpg"
      />
      <CardEvents
        title="Evento 2"
        description="Descrição do evento"
        image="https://cdn.pixabay.com/photo/2015/12/01/20/28/road-1072823_1280.jpg"
      />
      <CardEvents
        title="Evento 3"
        description="Descrição do evento"
        image="https://as2.ftcdn.net/v2/jpg/03/54/94/49/1000_F_354944901_SzU5v3KbpDM0752i9d7C3gSMjFexisw1.jpg"
      />
    </div>
  );
};

export default Events;
