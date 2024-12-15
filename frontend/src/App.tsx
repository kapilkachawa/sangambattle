import { Navbar } from '@/components/Navbar';
import { Hero } from '@/components/Hero';
import { About } from '@/components/About';
import { Rules } from '@/components/Rules';
import { Prizes } from '@/components/Prizes';
import { Contact } from '@/components/Contact';
import { Toaster } from '@/components/ui/toaster';

function App() {
  return (
    <div className="bg-[#0a0a0a] min-h-screen">
      <Navbar />
      <Hero />
      <About />
      <Rules />
      <Prizes />
      <Contact />
      <Toaster />
    </div>
  );
}

export default App;