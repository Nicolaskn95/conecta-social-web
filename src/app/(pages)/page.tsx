'use client';
import Calendar from '@/components/LandingPage/Calendar';
import Events from '@/components/LandingPage/Events';
import HowToHelp from '@/components/LandingPage/HowToHelp';
import OurJob from '@/components/LandingPage/OurJob';
import Carousel from '@/components/LandingPage/Carousel';

export default function Home() {
   const carouselImage = [
      '/images/carousel2.png',
      '/images/carousel3.png',
      '/images/carousel1.png',
   ];

   return (
      <div className="min-h-screen bg-gradient-to-br from-white via-blue-50 to-white">
         {/* Hero Section with Carousel */}
         <section className="relative">
            <Carousel images={carouselImage} />
         </section>

         {/* Main Content */}
         <main className="relative z-10">
            {/* Our Job Section */}
            <section className="py-20 px-4 sm:px-6 lg:px-8">
               <div className="max-w-7xl mx-auto">
                  <OurJob />
               </div>
            </section>

            {/* Events Section with Background */}
            <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-50 to-indigo-50">
               <div className="max-w-7xl mx-auto">
                  <Events />
               </div>
            </section>

            {/* How to Help Section */}
            <section className="py-20 px-4 sm:px-6 lg:px-8">
               <div className="max-w-7xl mx-auto">
                  <HowToHelp />
               </div>
            </section>

            {/* Calendar Section with Background */}
            <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-l from-blue-50 to-indigo-50">
               <div className="max-w-7xl mx-auto">
                  <Calendar />
               </div>
            </section>
         </main>
      </div>
   );
}
