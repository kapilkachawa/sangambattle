import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';
import { Register } from './Register'; 
import SangamBattleFestLogoBlack from '../assets/SangamBattlefestLogoBlack.png';
import SangamBattleFestLogoWhite from '../assets/SangamBattlefestLogoWhite.png';

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  return (
    <>
      <nav
        className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white/80 backdrop-blur-md text-black shadow-lg' : 'bg-transparent text-white'
          }`}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-[85px]">
            <div className="flex items-center space-x-2">
              <img
                src={isScrolled ? SangamBattleFestLogoWhite : SangamBattleFestLogoBlack}
                alt="SangamBattleFestLogo"
                className="w-52"
              />
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <button
                onClick={() => scrollToSection('home')}
                className="hover:text-green-500 transition-colors"
              >
                Home
              </button>
              <button
                onClick={() => scrollToSection('about')}
                className="hover:text-green-500 transition-colors"
              >
                About
              </button>
              <button
                onClick={() => scrollToSection('rules')}
                className="hover:text-green-500 transition-colors"
              >
                Rules
              </button>
              <button
                onClick={() => scrollToSection('prizes')}
                className="hover:text-green-500 transition-colors"
              >
                Prizes
              </button>
              <button
                onClick={() => scrollToSection('contact')}
                className="hover:text-green-500 transition-colors"
              >
                Contact
              </button>
              <Button
                variant="outline"
                className="bg-green-500 text-white hover:bg-green-600"
                onClick={() => setIsRegisterModalOpen(true)}
              >
                Register Now
              </Button>
            </div>
            <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>


          {isMenuOpen && (
            <div className="md:hidden absolute top-16 left-0 right-0 bg-black/95 backdrop-blur-lg">
              <div className="flex flex-col space-y-4 p-4">
                <button
                  onClick={() => scrollToSection('home')}
                  className="text-white hover:text-green-500 transition-colors"
                >
                  Home
                </button>
                <button
                  onClick={() => scrollToSection('about')}
                  className="text-white hover:text-green-500 transition-colors"
                >
                  About
                </button>
                <button
                  onClick={() => scrollToSection('rules')}
                  className="text-white hover:text-green-500 transition-colors"
                >
                  Rules
                </button>
                <button
                  onClick={() => scrollToSection('prizes')}
                  className="text-white hover:text-green-500 transition-colors"
                >
                  Prizes
                </button>
                <button
                  onClick={() => scrollToSection('contact')}
                  className="text-white hover:text-green-500 transition-colors"
                >
                  Contact
                </button>
                <Button
                  variant="outline"
                  className="bg-green-500 text-white hover:bg-green-600 border-none shadow-lg hover:shadow-green-500/50"
                  onClick={() => setIsRegisterModalOpen(true)}
                >
                  Register Now
                </Button>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Register Modal */}
      <Register isOpen={isRegisterModalOpen} onClose={() => setIsRegisterModalOpen(false)} />
    </>
  );
}

