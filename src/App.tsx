import { useReveal } from './hooks/useReveal';
import Navigation from './sections/Navigation';
import Footer from './sections/Footer';
import { resolve } from './routes';

function App({ path }: { path: string }) {
  useReveal();
  const page = resolve(path);

  return (
    <div className="min-h-screen bg-porcelain">
      <Navigation />
      <main>{page.element}</main>
      <Footer />
    </div>
  );
}

export default App;
