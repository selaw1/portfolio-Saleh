import { useReveal } from './hooks/useReveal';
import Navigation from './sections/Navigation';
import Hero from './sections/Hero';
import Figures from './sections/Figures';
import Services from './sections/Services';
import Process from './sections/Process';
import About from './sections/About';
import Booking from './sections/Booking';
import Footer from './sections/Footer';

function App() {
  useReveal();

  return (
    <div className="min-h-screen bg-porcelain">
      <Navigation />
      <main>
        <Hero />
        <Figures />
        <Services />
        <Process />
        <About />
        <Booking />
      </main>
      <Footer />
    </div>
  );
}

export default App;
