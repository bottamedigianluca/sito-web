
import React, { useState, useEffect, Suspense } from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
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
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { TextPlugin } from 'gsap/TextPlugin';
import { SplitText } from 'gsap/SplitText'; 
import { LanguageProvider, useLanguage } from './contexts/LanguageContext';
import LanguageCookieModal from './components/ui/LanguageCookieModal';

// Register GSAP plugins globally
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin, TextPlugin, SplitText);

interface NavLinkDataItem {
  id: string;
  href?: string; 
  labelKey: string;
  defaultLabel: string;
}

const navLinksData: NavLinkDataItem[] = [
  { id: 'storia', labelKey: 'nav.storia', defaultLabel: 'La Nostra Storia' },
  { id: 'dettaglio', labelKey: 'nav.banchetto', defaultLabel: 'Al Banchetto' },
  { id: 'ingrosso', labelKey: 'nav.ingrosso', defaultLabel: 'Servizi Ingrosso' },
  { id: 'perche-noi', labelKey: 'nav.percheNoi', defaultLabel: 'Perché Noi' },
  { id: 'contatti', labelKey: 'nav.contatti', defaultLabel: 'Contatti' },
];

const APP_LOADING_SIMULATION_DURATION = 1500; // This timer controls when App unmounts Preloader.

const AppContent: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const { language, t } = useLanguage();

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), APP_LOADING_SIMULATION_DURATION);
    return () => clearTimeout(timer);
  }, []);

  const resolvedNavLinks: NavLink[] = navLinksData.map(link => ({
    id: link.id,
    label: t(link.labelKey, link.defaultLabel)
  }));

  const siteName = "Bottamedi Frutta e Verdura";
  const defaultTitle = `${siteName} | ${t('hero.subtitle', 'Freschezza Trentina, Qualità Superiore')}`;
  const defaultDescription = t('hero.tagline', 'Scopri la freschezza quotidiana e la qualità superiore di Bottamedi. Frutta e verdura all\'ingrosso per HORECA e vendita al dettaglio a Mezzolombardo, Trentino.');


  if (loading) {
    return <Preloader />;
  }

  return (
    <>
      <Helmet htmlAttributes={{ lang: language }}>
        <title>{defaultTitle}</title>
        <meta name="description" content={defaultDescription} />
      </Helmet>
      <div className="flex flex-col min-h-screen bg-white">
        <Header navLinks={resolvedNavLinks} />
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
        <MobileNav navLinks={resolvedNavLinks} />
        <LanguageCookieModal />
      </div>
    </>
  );
}


const App: React.FC = () => {
  return (
    <HelmetProvider>
      <Suspense fallback={<div className="fixed inset-0 bg-white flex items-center justify-center z-[300]"><p>Loading...</p></div>}>
        <LanguageProvider>
          <AppContent />
        </LanguageProvider>
      </Suspense>
    </HelmetProvider>
  );
};

export default App;
