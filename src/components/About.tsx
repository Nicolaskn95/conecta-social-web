import React from "react";
import { Button } from "@mui/material";

const About = () => {
  return (
    <div className="text-center my-12">
      <img
        src="path-to-image.jpg"
        alt="Sobre"
        className="w-full h-64 object-cover"
      />
      <div className="max-w-2xl mx-auto mt-8">
        <p className="text-lg text-gray-700">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit...
        </p>
        <Button variant="contained" className="bg-gray-800 mt-4">
          Saiba Mais
        </Button>
      </div>
    </div>
  );
};

export default About;
