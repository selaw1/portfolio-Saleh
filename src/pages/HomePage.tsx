import Hero from '../sections/Hero';
import Figures from '../sections/Figures';
import Services from '../sections/Services';
import Process from '../sections/Process';
import About from '../sections/About';
import LatestPosts from '../sections/LatestPosts';
import Booking from '../sections/Booking';

export default function HomePage() {
  return (
    <>
      <Hero />
      <Figures />
      <Services />
      <Process />
      <About />
      <LatestPosts />
      <Booking />
    </>
  );
}
