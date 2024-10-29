import Calendar from "@/components/LandingPage/Calendar";
import Events from "@/components/LandingPage/Events";
import HowToHelp from "@/components/LandingPage/HowToHelp";
import Banner from "@/components/LandingPage/Banner";
import OurJob from "@/components/LandingPage/OurJob";

export default function Home() {
  return (
    <div>
      <Banner />
      <OurJob />
      <Events />
      <HowToHelp />
      <Calendar />
    </div>
  );
}
