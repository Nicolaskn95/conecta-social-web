import Calendar from "@/components/LandingPage/Calendar";
import Events from "@/components/LandingPage/Events";
import HowToHelp from "@/components/LandingPage/HowToHelp";
import OurJob from "@/components/LandingPage/OurJob";
import Carousel from "@/components/LandingPage/Carousel";

export default function Home() {
  const carouselImage = [
    "/images/carousel2.png",
    "/images/carousel3.png",
    "/images/carousel1.png",
  ];
  return (
    <div>
      <Carousel images={carouselImage} />
      <OurJob />
      <Events />
      <HowToHelp />
      <Calendar />
    </div>
  );
}
