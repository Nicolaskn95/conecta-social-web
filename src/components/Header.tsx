"use client";
import React from "react";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";

const Header = () => {
  return (
    <AppBar position="static" className="bg-white shadow-md">
      <Toolbar className="flex justify-between">
        <Typography variant="h6" className="text-black">
          Logo
        </Typography>
        <div>
          <Button className="text-black mx-2">Home</Button>
          <Button className="text-black mx-2">Sobre</Button>
          <Button className="text-black mx-2">Eventos</Button>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
