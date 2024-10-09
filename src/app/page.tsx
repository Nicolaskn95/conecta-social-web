"use client";
import Calendar from "@/components/Calendar";
import Events from "@/components/Events";
import Header from "@/components/Header";
import HowToHelp from "@/components/HowToHelp";
import Image from "next/image";
import About from "./about/page";
import Banner from "@/components/Banner";

export default function Home() {
  return (
    <div>
      <Banner />
      <About />
      <Events />
      <HowToHelp />
      <Calendar />
    </div>
  );
}
