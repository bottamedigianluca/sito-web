
import React, { useState, useEffect } from 'react';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import HeroSection from './components/sections/HeroSection';
import IntroSection from './components/sections/IntroSection';
import StorySection from './components/sections/StorySection';
import RetailSection from './components/sections/RetailSection';
import WholesaleSection from './components/sections/WholesaleSection';
import WhyUsSection from './components/sections/WhyUsSection';
import ContactSection from './components/sections/ContactSection';
import MobileNav from './components/layout/MobileNav';
import Preloader from './components/ui/Preloader';
import { NavLink } from './types';

const navLinks: NavLink[] = [
  { id: 'storia', label: 'La Nostra Storia' },
  { id: 'dettaglio', label: 'Al Banchetto' },
  { id: 'ingrosso', label: 'Servizi Ingrosso' },
  { id: 'perche-noi', label: 'Perché Noi' },
  { id: 'contatti', label: 'Contatti' },
];

const App: React.FC = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500); // Simulate loading time
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <Preloader />;
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header navLinks={navLinks} />
      <main className="flex-grow">
        <HeroSection />
        <IntroSection />
        <StorySection />
        <RetailSection />
        <WholesaleSection />
        <WhyUsSection />
        <ContactSection />
      </main>
      <Footer />
      <MobileNav navLinks={navLinks} />
    </div>
  );
};

export default App;
