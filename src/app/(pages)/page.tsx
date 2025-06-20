'use client';
import Calendar from '@/components/LandingPage/Calendar';
import Events from '@/components/LandingPage/Events';
import HowToHelp from '@/components/LandingPage/HowToHelp';
import OurJob from '@/components/LandingPage/OurJob';
import Carousel from '@/components/LandingPage/Carousel';
import Page from '@/components/template/manager/Page';

export default function Home() {
   const carouselImage = [
      '/images/carousel2.png',
      '/images/carousel3.png',
      '/images/carousel1.png',
   ];
   return (
      <>
         <Carousel images={carouselImage} />
         <div className="flex flex-col items-center px-4 sm:px-8 lg:px-36 md:px-16 mb-10">
            <OurJob />
            <Events />
            <HowToHelp />
            <Calendar />
         </div>
      </>
   );
}
