import React from "react";
import { Card, CardContent, Typography, Button } from "@mui/material";

const Calendar = () => {
  const eventos = [
    { title: "Evento 1", date: "01/01/2024" },
    { title: "Evento 2", date: "15/01/2024" },
    { title: "Evento 3", date: "30/01/2024" },
  ];

  return (
    <div className="my-12">
      <Typography variant="h4" className="text-center mb-8">
        Próximos Eventos
      </Typography>
      <div className="max-w-4xl mx-auto space-y-4">
        {eventos.map((evento, index) => (
          <Card key={index}>
            <CardContent>
              <Typography variant="h6">{evento.title}</Typography>
              <Typography variant="body2" color="textSecondary">
                {evento.date}
              </Typography>
              <Button variant="contained" className="bg-gray-800 mt-2">
                Saiba Mais
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Calendar;
