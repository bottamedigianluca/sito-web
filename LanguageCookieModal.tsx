import React, { useState, useEffect, useRef } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import Button from './Button'; 
import { GlobeAltIcon } from '../icons/HeroIcons'; 
import { gsap } from 'gsap';

const LanguageCookieModal: React.FC = () => {
  const { setLanguage, language } = useLanguage(); 
  const [isVisible, setIsVisible] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const storedLang = localStorage.getItem('bottamedi_lang');
    const consentGiven = localStorage.getItem('bottamedi_cookie_consent');
    if (!storedLang || !consentGiven) {
      setIsVisible(true);
    }
  }, []);

  useEffect(() => {
    const currentModalRef = modalRef.current;
    if (isVisible && currentModalRef) {
        const gsapCtx = gsap.context(() => {
            gsap.set(currentModalRef, { autoAlpha: 0, scale: 0.9, y: 20 });
            gsap.to(currentModalRef, { 
                autoAlpha: 1, scale: 1, y: 0, duration: 0.5, ease: 'expo.out', delay: 0.2 
            });
        }, currentModalRef);
        return () => gsapCtx.revert();
    }
  }, [isVisible]);

  const handleAccept = (selectedLang: 'it' | 'de') => {
    setLanguage(selectedLang); 
    localStorage.setItem('bottamedi_cookie_consent', 'true'); 
    
    if (modalRef.current) {
      const gsapCtx = gsap.context(() => { 
        gsap.to(modalRef.current, { 
          autoAlpha: 0, scale: 0.9, y: 20, duration: 0.3, ease: 'power2.in',
          onComplete: () => setIsVisible(false)
        });
      }, modalRef.current);
    } else {
      setIsVisible(false);
    }
  };

  if (!isVisible) {
    return null;
  }

  // Use default strings initially as 't' might not be fully synced if language changes right as modal appears
  const initialTitle = "Benvenuto! / Willkommen!";
  const cookieMessageCombined = document.documentElement.lang === 'de' ? 
    "Wir verwenden Cookies für das beste Erlebnis und Ihre Sprachwahl. Mit Klick auf eine Sprache stimmen Sie zu." :
    "Utilizziamo i cookie per assicurarti la migliore esperienza e ricordare la tua lingua. Cliccando su una lingua, acconsenti.";
  const initialSelectLabel = document.documentElement.lang === 'de' ? "Sprache wählen:" : "Seleziona lingua:";


  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-70 backdrop-blur-md flex items-center justify-center z-[200] p-4">
      <div ref={modalRef} className="bg-white p-6 md:p-8 rounded-xl shadow-2xl max-w-md w-full text-center opacity-0"> {/* Initial opacity 0 for GSAP */}
        <GlobeAltIcon className="h-16 w-16 text-brand-green mx-auto mb-4 animate-subtle-bob" />
        <h2 className="text-2xl font-serif font-bold text-brand-gray-dark mb-3">
          {initialTitle}
        </h2>
        
        <p className="text-sm text-brand-gray-dark mb-6">
          {cookieMessageCombined}
        </p>

        <div className="mb-4">
          <label htmlFor="language-select-modal" className="block text-sm font-medium text-brand-gray-dark mb-3">
            {initialSelectLabel}
          </label>
          <div className="flex flex-col sm:flex-row justify-center space-y-3 sm:space-y-0 sm:space-x-3">
            <Button 
              onClick={() => handleAccept('it')}
              variant={language === 'it' ? "primary" : "secondary"} 
              size="md"
              className="w-full sm:w-1/2 border-brand-green"
              aria-label="Seleziona Italiano"
            >
              Italiano 🇮🇹
            </Button>
            <Button 
              onClick={() => handleAccept('de')}
              variant={language === 'de' ? "primary" : "secondary"}
              size="md"
              className="w-full sm:w-1/2 border-brand-green"
              aria-label="Select German"
            >
              Deutsch 🇩🇪
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LanguageCookieModal;
